import { CreateApostilleService }  from '../src/service/CreateApostilleService';
import { SHA256 } from '../src/hash/hash';
import { NetworkType, Listener } from 'nem2-sdk';
import * as fs from 'fs';
import { filter } from 'rxjs/operators';

console.log(__dirname);
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const filename = `${Math.random().toString(32).substring(2)}.png`;
const ownerPrivateKey = '43E472BE7DCDD9A027F1088CB332E7F755671BE9A72571712F305B998EB3AD60';
const sha256 = new SHA256();
const url = 'https://sym-test.opening-line.jp:3001';
const networkGenerationHash = '45870419226A7E51D61D94AD728231EDC6C9B3086EF9255A8421A4F26870456A';
const metadata = { filename: '90681.jpeg', description: 'daoka icon' };

const apostilleService = CreateApostilleService.create(fileData, filename,
                                                       sha256, ownerPrivateKey,
                                                       url, NetworkType.TEST_NET,
                                                       networkGenerationHash, 1000);

apostilleService.addAnnouncePublicSinkTransaction();
apostilleService.addAssignOwnershipTransaction();
apostilleService.addMetadataTransactions(metadata);

const listener = new Listener(url);
listener.open().then(() => {
  listener.status(apostilleService.getOwnerAddress())
  .pipe(filter(error => error.hash === apostilleService.getTxHash()))
  .subscribe((err) => {
    console.error(err);
    listener.close();
  });
  listener.confirmed(apostilleService.getOwnerAddress())
  .pipe(
    filter(transaction => (transaction.transactionInfo !== undefined &&
    transaction.transactionInfo.hash === apostilleService.getTxHash())),
  ).subscribe((_) => {
    console.log('transaction confirmed');
    listener.close();
  });
  apostilleService.announceAsync().then(
    (x) => { console.log(x); },
    (err) => { console.error(err); },
  );
});
