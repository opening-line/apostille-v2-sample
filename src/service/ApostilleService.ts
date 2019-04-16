import { HashFunction } from '../hash/HashFunction';
import { NetworkType, Account, TransferTransaction,
    Deadline, PlainMessage, InnerTransaction, AggregateTransaction,
    Listener, TransactionHttp, Transaction} from 'nem2-sdk';
import { ApostilleAccount } from '../model/ApostilleAccount';
import { filter } from 'rxjs/operators';
import { AnnounceResult } from '../model/AnnounceResult';

export class ApostilleService {

  private ownerAccount: Account;
  private apostilleAccount: ApostilleAccount;

  private coreTransaction?: InnerTransaction;

  public constructor(private data: string,
                     filename: string,
                     private hashFunction: HashFunction,
                     private url: string,
                     private networkType: NetworkType,
                     ownerPrivateKey: string) {
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

  public announce() {
    if (!this.isAnnounceable()) {
      throw Error('can not announceable');
    }

    const transactionHttp = new TransactionHttp(this.url);
    const listener = new Listener(this.url);
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
    /*
    return this.ownerAccount.signTransactionWithCosignatories(
      aggregateTransaction,
      [this.apostilleAccount.account],
    );*/
    return this.ownerAccount.sign(aggregateTransaction);
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
    return [this.coreTransaction!];
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
