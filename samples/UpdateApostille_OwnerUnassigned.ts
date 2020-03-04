import { UpdateApostilleService }  from '../src/service/service';
import { SHA256 } from '../src/hash/hash';
import { NetworkType, Account } from 'nem2-sdk';
import * as fs from 'fs';

console.log(__dirname);
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const ownerPrivateKey = 'DFD40EE55EB215FF96ABCFC8D3E4E02EF77B4158306725DBF4243C91D8CBA774';
const sha256 = new SHA256();
const url = 'https://sym-test.opening-line.jp:3001';
const networkGenerationHash = '45870419226A7E51D61D94AD728231EDC6C9B3086EF9255A8421A4F26870456A';
const apostilleAccountPrivateKey = '776BE16FA2CFE59B9B7D5DAEBAD406F54414ABA551F2AD44A373BE70AA8E7D0C';
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
