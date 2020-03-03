import { Account, InnerTransaction, NetworkType,
  Deadline, Listener, AggregateTransaction, SignedTransaction,
  TransactionHttp, TransferTransaction, PlainMessage,
  MultisigAccountModificationTransaction } from 'nem2-sdk';
import { HashFunction } from '../hash/HashFunction';
import { ApostilleAccount, AnnounceResult, MetadataTransaction, Sinks } from '../model/model';
import * as NodeWebSocket from 'ws';
import { filter } from 'rxjs/operators';

export abstract class GeneralApostilleService {

  public ownerAccount: Account;
  public apostilleAccount!: ApostilleAccount;

  public coreTransaction?: InnerTransaction;
  public announcePublicSinkTransaction?: InnerTransaction;
  public metadataTransactions?: InnerTransaction[];
  public assignOwnershipTransaction?: InnerTransaction;

  public feeMultiplier: number;
  public txHash?: string;

  constructor(private data: string,
              private hashFunction: HashFunction,
              ownerPrivateKey: string,
              public apiEndpoint: string,
              public networkType: NetworkType,
              public networkGenerationHash: string,
              feeMultiplier?: number) {
    this.ownerAccount = Account.createFromPrivateKey(ownerPrivateKey, this.networkType);
    if (feeMultiplier) {
      this.feeMultiplier = feeMultiplier;
    } else {
      this.feeMultiplier = 0;
    }
  }

  public createCoreTransaction() {
    const transaction = TransferTransaction.create(
      Deadline.create(),
      this.apostilleAccount.address,
      [],
      PlainMessage.create(this.signedFileHash()),
      this.networkType,
    );
    this.coreTransaction = transaction.toAggregate(this.ownerAccount.publicAccount);
  }

  public addAnnouncePublicSinkTransaction() {
    const sinkAddress = Sinks.getAddress(this.networkType);
    const transaction = TransferTransaction.create(
      Deadline.create(),
      sinkAddress,
      [],
      PlainMessage.create(this.signedFileHash()),
      this.networkType,
    );
    this.announcePublicSinkTransaction =
      transaction.toAggregate(this.apostilleAccount.publicAccount);
  }

  public addAssignOwnershipTransaction() {
    const transaction = MultisigAccountModificationTransaction.create(
      Deadline.create(),
      1,
      1,
      [this.ownerAccount.publicAccount],
      [],
      this.networkType,
    );
    this.assignOwnershipTransaction = transaction.toAggregate(this.apostilleAccount.publicAccount);
  }

  public addMetadataTransactions(metadata: Object) {
    const transactions = MetadataTransaction
    .objectToMetadataTransactions(metadata,
                                  this.apostilleAccount.publicAccount,
                                  this.networkType);
    this.metadataTransactions = transactions;
  }

  public innerTransactions() {
    const innerTransactions: InnerTransaction[] = [];
    innerTransactions.push(this.coreTransaction!);
    if (this.announcePublicSinkTransaction) {
      innerTransactions.push(this.announcePublicSinkTransaction);
    }
    if (this.assignOwnershipTransaction) {
      innerTransactions.push(this.assignOwnershipTransaction);
    }
    if (this.metadataTransactions) {
      Array.prototype.push.apply(innerTransactions, this.metadataTransactions);
    }
    return innerTransactions;
  }

  public createCompleteTransaction() {
    const transaction = AggregateTransaction.createComplete(
      Deadline.create(),
      this.innerTransactions(),
      this.networkType,
      [],
    ).setMaxFee(this.feeMultiplier) as AggregateTransaction;

    return transaction;
  }

  public signedFileHash() {
    return this.hashFunction.apostilleTransactionMessage(this.data,
                                                         this.ownerAccount.privateKey,
                                                         this.networkType);
  }

  public getTxHash() {
    return this.txHash;
  }

  public getOwnerAddress() {
    return this.ownerAccount.address;
  }

  public listener(webSocket?: any) {
    const wsEndpoint = this.apiEndpoint.replace('http', 'ws');
    let ws = webSocket;
    if (ws) {
      ws = NodeWebSocket.default;
    }
    const listener = new Listener(wsEndpoint, ws);
    return listener;
  }

  public async announceComplete(webSocket?: any) {
    const transactionHttp = new TransactionHttp(this.apiEndpoint);
    const listener = this.listener(webSocket);

    const signedTx = await this.signTransaction();
    this.txHash = signedTx.hash;
    return new Promise<AnnounceResult>((resolve, reject) => {
      listener.open().then(() => {
        listener.status(this.ownerAccount.address)
        .pipe((filter(error => error.hash === signedTx.hash)))
        .subscribe((err) => {
          listener.close();
          reject(err);
        });
        listener.unconfirmedAdded(this.ownerAccount.address)
        .pipe(
          filter(transaction => (transaction.transactionInfo !== undefined
            && transaction.transactionInfo.hash === signedTx.hash)),
        ).subscribe((_) => {
          listener.close();
          const result = this.announceResult(signedTx);
          resolve(result);
        });
        listener.confirmed(this.ownerAccount.address)
        .pipe(
          filter(transaction => (transaction.transactionInfo !== undefined
            && transaction.transactionInfo.hash === signedTx.hash)),
        ).subscribe((_) => {
          listener.close();
          const result = this.announceResult(signedTx);
          resolve(result);
        });
        transactionHttp.announce(signedTx).subscribe(
          (_) => {},
          (err) => {
            listener.close();
            reject(err);
          },
        );
      });
    });
  }

  public async signTransaction() {
    const transaction = this.createCompleteTransaction();
    if (await this.isNeedApostilleAccountSign()) {
      const signedTx = this.ownerAccount.signTransactionWithCosignatories(
        transaction,
        [this.apostilleAccount.account as Account],
        this.networkGenerationHash,
      );
      return signedTx;
    }
    const signedTx = this.ownerAccount.sign(transaction, this.networkGenerationHash);
    return signedTx;
  }

  public announceResult(signedTx: SignedTransaction) {
    const announceResult = new AnnounceResult(
      signedTx.hash,
      this.signedFileHash(),
      this.ownerAccount.publicAccount,
      this.apostilleAccount,
    );
    return announceResult;
  }

  public abstract async isNeedApostilleAccountSign();
}
