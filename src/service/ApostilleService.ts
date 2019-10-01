import { HashFunction } from '../hash/HashFunction';
import { NetworkType, Account, TransferTransaction,
    Deadline, PlainMessage, InnerTransaction, AggregateTransaction,
    Listener, TransactionHttp, Transaction,
    MultisigCosignatoryModification,
    MultisigAccountModificationTransaction,
    CosignatoryModificationAction} from 'nem2-sdk';
import { ApostilleAccount } from '../model/ApostilleAccount';
import { filter } from 'rxjs/operators';
import { AnnounceResult } from '../model/AnnounceResult';
import * as NodeWebSocket from 'ws';
import { Sinks } from '../model/Sink';

export class ApostilleService {

  private ownerAccount: Account;
  private apostilleAccount: ApostilleAccount;

  private coreTransaction?: InnerTransaction;
  private announcePublicSinkTransaction?: InnerTransaction;
  private metadataTransaction?: InnerTransaction;
  private assignOwnershipTransaction?: InnerTransaction;

  public constructor(private data: string,
                     filename: string,
                     private hashFunction: HashFunction,
                     private url: string,
                     private networkType: NetworkType,
                     ownerPrivateKey: string,
                     private networkGenerationHash) {
    this.ownerAccount = Account.createFromPrivateKey(ownerPrivateKey, networkType);
    this.apostilleAccount = ApostilleAccount.create(filename, this.ownerAccount);
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

  public createAnnouncePublicSinkTransaction() {
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

  public createAssignOwnershipTransaction() {
    const transaction = MultisigAccountModificationTransaction.create(
      Deadline.create(),
      1,
      1,
      [
        new MultisigCosignatoryModification(
          CosignatoryModificationAction.Add,
          this.ownerAccount.publicAccount,
        ),
      ],
      this.networkType,
    );
    this.assignOwnershipTransaction = transaction.toAggregate(this.apostilleAccount.publicAccount);
  }

  public createMetadataTransaction(metadata: any) {
    const message = JSON.stringify(metadata);
    const transaction = TransferTransaction.create(
      Deadline.create(),
      this.apostilleAccount.address,
      [],
      PlainMessage.create(message),
      this.networkType,
    );
    this.metadataTransaction = transaction.toAggregate(this.apostilleAccount.publicAccount);
  }

  public announce(webSocket?: any) {
    if (!this.isAnnounceable()) {
      throw Error('can not announceable');
    }

    const transactionHttp = new TransactionHttp(this.url);
    const wsEndpoint = this.url.replace('http', 'ws');
    let ws = webSocket;
    if (!ws) {
      ws = NodeWebSocket.default;
    }
    const listener = new Listener(wsEndpoint, ws);
    const signedTransaction = this.signTransaction();
    return new Promise<AnnounceResult>((resolve, reject) => {
      listener.open().then(() => {
        listener
          .status(this.ownerAccount.address)
          .pipe(filter(error => error.hash === signedTransaction.hash))
          .subscribe((error) => {
            console.error(error);
            reject(error);
          });

        listener
          .unconfirmedAdded(this.ownerAccount.address)
          .pipe(
            filter((transaction => (transaction.transactionInfo !== undefined
              && transaction.transactionInfo.hash === signedTransaction.hash))),
          ).subscribe((result) => {
            const announceResult = new AnnounceResult(result.transactionInfo!.hash!,
                                                      this.signedFileHash(),
                                                      this.ownerAccount.publicAccount,
                                                      this.apostilleAccount.account);
            listener.close();
            resolve(announceResult);
          });

        transactionHttp.announce(signedTransaction).subscribe(
            x => console.log(x),
            err => reject(err),
          );
      });
    });
  }

  private signTransaction() {
    const aggregateTransaction = this.createAggregateTransaction();
    if (this.needApostilleAccountsSign()) {
      return this.ownerAccount.signTransactionWithCosignatories(
        aggregateTransaction,
        [this.apostilleAccount.account],
        this.networkGenerationHash,
      );
    }

    return this.ownerAccount.sign(aggregateTransaction, this.networkGenerationHash);
  }

  private needApostilleAccountsSign() {
    if (this.metadataTransaction || this.assignOwnershipTransaction
      || this.announcePublicSinkTransaction) {
      return true;
    }
    return false;
  }

  private createAggregateTransaction() {
    return AggregateTransaction.createComplete(
      Deadline.create(),
      this.innerTransactions(),
      this.networkType,
      [],
    );
  }

  private innerTransactions() {
    const innerTransactions: InnerTransaction[] = [];
    innerTransactions.push(this.coreTransaction!);
    if (this.announcePublicSinkTransaction) {
      innerTransactions.push(this.announcePublicSinkTransaction!);
    }
    if (this.assignOwnershipTransaction) {
      innerTransactions.push(this.assignOwnershipTransaction!);
    }
    if (this.metadataTransaction) {
      innerTransactions.push(this.metadataTransaction!);
    }
    return innerTransactions;
  }

  private signedFileHash() {
    return this.hashFunction.apostilleTransactionMessage(this.data,
                                                         this.ownerAccount.privateKey,
                                                         this.networkType);
  }

  private isAnnounceable() {
    return (this.coreTransaction instanceof Transaction);
  }
}
