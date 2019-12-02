import { ApostilleService } from '../src/service/ApostilleService';
import { SHA256 } from '../src/hash/hash';
import { NetworkType, Account } from 'nem2-sdk';
import * as fs from 'fs';

console.log(__dirname);
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const filename = '90681.png';
const ownerPrivateKey = Account.generateNewAccount(NetworkType.MIJIN_TEST).privateKey;
const sha256 = new SHA256();
const url = 'https://fushicho2-nofee.opening-line.jp:3001';
const networkGenerationHash = 'A13A79D7441FDB856D8E366AEC3153DFA7554A9471E9C41E1E351680BA48B9FB';
const metadata = { filename: '90681.jpeg', description: 'daoka icon' };

const apostilleService = ApostilleService.createApostille(fileData, filename, sha256,
                                                          ownerPrivateKey, url,
                                                          NetworkType.MIJIN_TEST,
                                                          networkGenerationHash);

apostilleService.createCoreTransaction();
apostilleService.addAnnouncePublicSinkTransaction();
apostilleService.addAssignOwnershipTransaction();
apostilleService.addMetadataTransaction(metadata);
apostilleService.announce()!.then(
  (x) => {
    console.log(`txhash: ${x.txHash}`);
    console.log(`filehash: ${x.fileHash}`);
    console.log(`apostille account address: ${x.apostilleAccount.address.plain()}`);
    console.log(`owner account address : ${x.ownerPublicAccount.address.plain()}`);
  },
  err => console.error(err),
);
