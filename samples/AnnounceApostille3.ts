import { InnerTransactionService } from '../src/service/InnerTransactionService';
import { SHA256 } from '../src/hash/hash';
import { NetworkType, Account, AggregateTransaction,
   Deadline, RepositoryFactoryHttp, TransactionService } from 'nem2-sdk';
import * as fs from 'fs';
import { merge } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

const networkType = NetworkType.TEST_NET;
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const filename = `${Math.random().toString(32).substring(2)}.png`;
const ownerPrivateKey = 'DFD40EE55EB215FF96ABCFC8D3E4E02EF77B4158306725DBF4243C91D8CBA774';
const ownerAccount = Account.createFromPrivateKey(ownerPrivateKey, networkType);
const sha256 = new SHA256();
const url = 'https://sym-test.opening-line.jp:3001';
const networkGenerationHash = '45870419226A7E51D61D94AD728231EDC6C9B3086EF9255A8421A4F26870456A';
const repositoryFactoryHttp = new RepositoryFactoryHttp(url);

const innerTxService = InnerTransactionService.create(fileData, filename, sha256,
                                                      ownerPrivateKey, networkType);
innerTxService.createCoreTransaction();
const innerTransactions = innerTxService.innerTransactions();

const aggregateTx = AggregateTransaction.createComplete(
  Deadline.create(),
  innerTransactions,
  networkType,
  [],
).setMaxFee(150);

const signedTx = ownerAccount.sign(aggregateTx, networkGenerationHash);

const transactionRepo = repositoryFactoryHttp.createTransactionRepository();
const receiptRepo = repositoryFactoryHttp.createReceiptRepository();
const listener = repositoryFactoryHttp.createListener();
const transactionService = new TransactionService(transactionRepo, receiptRepo);

listener.open().then(() => {
  merge(transactionService.announce(signedTx, listener),
        listener.status(ownerAccount.address)
  .pipe(
    filter(error => error.hash === signedTx.hash),
    tap((error) => {
      console.log(error);
    }),
  )).subscribe((transaction) => {
    console.log(transaction);
    listener.close();
  },           (err) => {
    console.error(err);
  });
});
