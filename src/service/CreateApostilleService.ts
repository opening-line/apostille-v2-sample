import { ApostilleAccount } from '../model/ApostilleAccount';
import { InnerTransaction, NetworkType, Account,
   TransferTransaction, Deadline, PlainMessage, MultisigAccountModificationTransaction,
    AggregateTransaction,
    TransactionHttp, Listener, SignedTransaction } from 'nem2-sdk';
import { HashFunction } from '../hash/hash';
import { Sinks } from '../model/Sink';
import { MetadataTransaction } from '../model/MetadataTransaction';
import * as NodeWebSocket from 'ws';
import { AnnounceResult } from '../model/AnnounceResult';
import { filter } from 'rxjs/operators';

export class CreateApostilleService {

  private ownerAccount: Account;
  private apostilleAccount: ApostilleAccount;

  private coreTransaction?: InnerTransaction;
  private announcePublicSinkTransaction?: InnerTransaction;
  private metadataTransactions?: InnerTransaction[];
  private assignOwnershipTransaction?: InnerTransaction;

  private feeMultiplier: number;
  private txHash?: string;

  public static create(data: string,
                       filename: string,
                       hashFunction: HashFunction,
                       ownerPrivateKey: string,
                       apiEndpoint: string,
                       networkType: NetworkType,
                       networkGenerationHash: string,
                       feeMultiplier?: number) {
    const service = new CreateApostilleService(data, filename,
                                               hashFunction, ownerPrivateKey, apiEndpoint,
                                               networkType, networkGenerationHash, feeMultiplier);
    return service;
  }

  constructor(private data: string,
              filename,
              private hashFunction: HashFunction,
              ownerPrivateKey: string,
              private apiEndpoint: string,
              private networkType: NetworkType,
              private networkGenerationHash: string,
              feeMultiplier?: number,
    ) {
    this.ownerAccount = Account.createFromPrivateKey(ownerPrivateKey, this.networkType);
    this.apostilleAccount = ApostilleAccount.create(filename, this.ownerAccount);
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

  public announce(webSocket?: any) {
    const transactionHttp = new TransactionHttp(this.apiEndpoint);
    const listener = this.listener(webSocket);

    const signedTx = this.signTransaction();
    this.txHash = signedTx.hash;
    return new Promise<AnnounceResult>((resolve, reject) => {
      listener.open().then(() => {
        listener.status(this.ownerAccount.address)
        .pipe(filter(error => error.hash === signedTx.hash))
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
        transactionHttp.announce(signedTx).subscribe(
            (_) => {},
            (err) => {
              listener.close();
              reject(err);
            });
      });
    });
  }

  public announceAsync() {
    const transactionHttp = new TransactionHttp(this.apiEndpoint);
    const signedTx = this.signTransaction();
    this.txHash = signedTx.hash;
    return new Promise<AnnounceResult>((resolve, reject) => {
      transactionHttp.announce(signedTx).subscribe(
        (x) => {
          resolve(this.announceResult(signedTx));
        },
        (err) => {
          reject(err);
        },
      );
    });
  }

  public getTxHash() {
    return this.txHash;
  }

  public getOwnerAddress() {
    return this.ownerAccount.address;
  }

  private announceResult(signedTx: SignedTransaction) {
    const announceResult = new AnnounceResult(
      signedTx.hash,
      this.signedFileHash(),
      this.ownerAccount.publicAccount,
      this.apostilleAccount,
    );
    return announceResult;
  }

  private listener(webSoket?: any) {
    const wsEndpoint = this.apiEndpoint.replace('http', 'ws');
    let ws = webSoket;
    if (ws) {
      ws = NodeWebSocket.default;
    }
    const listener = new Listener(wsEndpoint, ws);
    return listener;
  }

  private signTransaction() {
    const transaction = this.createTransaction();
    if (this.isNeedApostilleAccountSign()) {
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

  private createTransaction() {
    const transaction = AggregateTransaction.createComplete(
      Deadline.create(),
      this.innerTransactions(),
      this.networkType,
      [],
    ).setMaxFee(this.feeMultiplier) as AggregateTransaction;

    return transaction;
  }

  private innerTransactions() {
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

  private signedFileHash() {
    return this.hashFunction.apostilleTransactionMessage(this.data,
                                                         this.ownerAccount.privateKey,
                                                         this.networkType);
  }

  private isNeedApostilleAccountSign() {
    if (this.announcePublicSinkTransaction
      || this.assignOwnershipTransaction
      || this.metadataTransactions) {
      return true;
    }
    return false;
  }

}
