import { SHA256 } from '../src/hash/hash';
import { PublicAccount, NetworkType } from 'nem2-sdk';

const seed = 'PublicSinkAddress';
const sha256 = new SHA256();
const publicKey = sha256.hashing(seed);
const publicAccount = PublicAccount.createFromPublicKey(publicKey, NetworkType.MIJIN_TEST);
console.log(publicAccount.address.plain());

// result: SCGWG66Z5DWYKQNB6M4UITN4NP4GGUWKMCG5U6ZT
