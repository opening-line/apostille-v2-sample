import { UpdateApostilleService }  from '../src/service/service';
import { SHA256 } from '../src/hash/hash';
import { NetworkType, Account } from 'symbol-sdk';
import * as fs from 'fs';

console.log(__dirname);
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const ownerPrivateKey = '42955088A7D670F512A020AEEC6C42DDE2B2CE3969C154DD4CD8EA573A2BEA56';
const sha256 = new SHA256();
const url = 'https://sym-test.opening-line.jp:3001';
const networkGenerationHash = 'ACECD90E7B248E012803228ADB4424F0D966D24149B72E58987D2BF2F2AF03C4';
const apostilleAccountPrivateKey = '5DFECB922D39578FC711771D36C96878A76AF95753301EB5C2775C4D38F25E05';
const apostilleAccount = Account.createFromPrivateKey(apostilleAccountPrivateKey,
                                                      NetworkType.TEST_NET);

const apostilleService = UpdateApostilleService.create(fileData,
                                                       sha256, ownerPrivateKey,
                                                       apostilleAccount,
                                                       url, NetworkType.TEST_NET,
                                                       networkGenerationHash, 150);

apostilleService.addAnnouncePublicSinkTransaction();
apostilleService.announce().then(
  (x) => {
    console.log(`txhash: ${x.txHash}`);
    console.log(`filehash: ${x.fileHash}`);
    console.log(`apostille account pubkey: ${x.apostilleAccount.publicAccount.publicKey}`);
    console.log(`owner account address : ${x.ownerPublicAccount.address.plain()}`);
  },
  err => console.error(err),
);
