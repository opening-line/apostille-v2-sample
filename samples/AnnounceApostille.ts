import { ApostilleService } from '../src/service/ApostilleService';
import { SHA256 } from '../src/hash/hash';
import { NetworkType } from 'nem2-sdk';
import * as fs from 'fs';

console.log(__dirname);
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const filename = `${Math.random().toString(32).substring(2)}.png`;
const ownerPrivateKey = '73C874F7BC7F81AA2B3CD064B5A9FB9AD08923161F18CE04A4326E0026DCF78E';
const sha256 = new SHA256();
const url = 'https://fushicho2-fee.opening-line.jp:3001';
const networkGenerationHash = 'CCD475695907114DD465FBFB0C53B1CF335258A6C3730DBAAF63FD5AA35B7697';
const metadata = { filename: '90681.jpeg', description: 'daoka icon' };

const apostilleService = ApostilleService.createApostille(fileData, filename, sha256,
                                                          ownerPrivateKey, url,
                                                          NetworkType.MIJIN_TEST,
                                                          networkGenerationHash, 1000);

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
