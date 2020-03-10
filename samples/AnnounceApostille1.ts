import { CreateApostilleService }  from '../src/service/CreateApostilleService';
import { SHA256 } from '../src/hash/hash';
import { NetworkType } from 'symbol-sdk';
import * as fs from 'fs';

console.log(__dirname);
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const filename = `${Math.random().toString(32).substring(2)}.png`;
const ownerPrivateKey = '43E472BE7DCDD9A027F1088CB332E7F755671BE9A72571712F305B998EB3AD60';
const sha256 = new SHA256();
const url = 'https://sym-test.opening-line.jp:3001';
const networkGenerationHash = '44D2225B8932C9A96DCB13508CBCDFFA9A9663BFBA2354FEEC8FCFCB7E19846C';
const metadata = { filename: '90681.jpeg', description: 'daoka icon' };

const apostilleService = CreateApostilleService.create(fileData, filename,
                                                       sha256, ownerPrivateKey,
                                                       url, NetworkType.TEST_NET,
                                                       networkGenerationHash, 1000);

apostilleService.addAnnouncePublicSinkTransaction();
apostilleService.addAssignOwnershipTransaction();
apostilleService.addMetadataTransactions(metadata);
apostilleService.announce().then(
  (x) => {
    console.log(`txhash: ${x.txHash}`);
    console.log(`filehash: ${x.fileHash}`);
    console.log(`apostille account pubkey: ${x.apostilleAccount.publicAccount.publicKey}`);
    console.log(`owner account address : ${x.ownerPublicAccount.address.plain()}`);
  },
  err => console.error(err),
);
