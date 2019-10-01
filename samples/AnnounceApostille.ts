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
const url = 'https://elephant3.opening-line.jp:3001';
const networkGenerationHash = 'D4850DCDDEB89D7FC84088A405AA850D69A17D36F17EBC2FE6A87588476F9821';
const metadata = { filename: '90681.jpeg', description: 'daoka icon' };

const apostilleService = new ApostilleService(fileData, filename,
                                              sha256, url,
                                              NetworkType.MIJIN_TEST, ownerPrivateKey,
                                              networkGenerationHash);

apostilleService.createCoreTransaction();
apostilleService.createAnnouncePublicSinkTransaction();
apostilleService.createAssignOwnershipTransaction();
apostilleService.createMetadataTransaction(metadata);
apostilleService.announce().then(
  (x) => {
    console.log(`txhash: ${x.txHash}`);
    console.log(`filehash: ${x.fileHash}`);
    console.log(`apostille account address: ${x.apostilleAccount.address.plain()}`);
    console.log(`owner account address : ${x.ownerPublicAccount.address.plain()}`);
  },
  err => console.error(err),
);
