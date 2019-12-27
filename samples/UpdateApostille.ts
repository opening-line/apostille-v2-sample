import { UpdateApostilleService }  from '../src/service/service';
import { SHA256 } from '../src/hash/hash';
import { NetworkType, PublicAccount } from 'nem2-sdk';
import * as fs from 'fs';

console.log(__dirname);
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const ownerPrivateKey = '43E472BE7DCDD9A027F1088CB332E7F755671BE9A72571712F305B998EB3AD60';
const sha256 = new SHA256();
const url = 'http://ec2-3-136-106-135.us-east-2.compute.amazonaws.com:3000';
const networkGenerationHash = '53F0604E403333BAD330503C196FF435A1AF6A4C166F8B967C6E1716D959ED34';
const apostilleAccountPubKey = '8F35CFF8557269DD8BBA515F2E00F1201EDE99E030FF1F9945C13DA5E0F89790';
const apostillePubAccount = PublicAccount.createFromPublicKey(apostilleAccountPubKey,
                                                              NetworkType.TEST_NET);

const apostilleService = UpdateApostilleService.create(fileData,
                                                       sha256, ownerPrivateKey,
                                                       apostillePubAccount,
                                                       url, NetworkType.TEST_NET,
                                                       networkGenerationHash, 1000);

apostilleService.createCoreTransaction();
apostilleService.addAnnouncePublicSinkTransaction();
apostilleService.announce()!.then(
  (x) => {
    console.log(`txhash: ${x.txHash}`);
    console.log(`filehash: ${x.fileHash}`);
    console.log(`apostille account pubkey: ${x.apostilleAccount.publicAccount.publicKey}`);
    console.log(`owner account address : ${x.ownerPublicAccount.address.plain()}`);
  },
  err => console.error(err),
);
