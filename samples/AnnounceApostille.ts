import { ApostilleService } from '../src/service/ApostilleService';
import { SHA256 } from '../src/hash/hash';
import { NetworkType } from 'nem2-sdk';

const text = 'aaaaaaaaa';
const filename = 'sample.txt';
const ownerPrivateKey = 'aaaaaaaaaaeeeeeeeeeebbbbbbbbbb5555555555dddddddddd1111111111aaee';
const sha256 = new SHA256();
const url = 'http://18.217.110.63:3000';
const metadata = { a: 'hoge', b: ['b1', 'b2'], c: { c1: 'fuga' }, d: null };

const apostilleService = new ApostilleService(text, filename,
                                              sha256, url,
                                              NetworkType.MIJIN_TEST, ownerPrivateKey);

apostilleService.createCoreTransaction();
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
