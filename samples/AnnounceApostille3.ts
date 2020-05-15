import { InnerTransactionService } from '../src/service/InnerTransactionService';
import { SHA256 } from '../src/hash/hash';
import { NetworkType, Account, AggregateTransaction,
   Deadline, RepositoryFactoryHttp, TransactionService } from 'symbol-sdk';
import * as fs from 'fs';
import { merge } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

const networkType = NetworkType.TEST_NET;
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const filename = `${Math.random().toString(32).substring(2)}.png`;
const ownerPrivateKey = '42955088A7D670F512A020AEEC6C42DDE2B2CE3969C154DD4CD8EA573A2BEA56';
const ownerAccount = Account.createFromPrivateKey(ownerPrivateKey, networkType);
const sha256 = new SHA256();
const url = 'https://sym-test.opening-line.jp:3001';
const networkGenerationHash = 'ACECD90E7B248E012803228ADB4424F0D966D24149B72E58987D2BF2F2AF03C4';
const repositoryFactoryHttp = new RepositoryFactoryHttp(url);

const innerTxService = InnerTransactionService.create(fileData, filename, sha256,
                                                      ownerPrivateKey, networkType);
const innerTransactions = innerTxService.innerTransactions();
const aggregateTx = AggregateTransaction.createComplete(
  Deadline.create(),
  innerTransactions,
  networkType,
  [],
).setMaxFeeForAggregate(100, 2);

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
    console.log(`apostille account private key : ${innerTxService.apostilleAccount.account!.privateKey}`);
    listener.close();
  },           (err) => {
    console.error(err);
  });
});
