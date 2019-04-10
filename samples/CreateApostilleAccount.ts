import { ApostilleAccount } from '../src/model/ApostilleAccount';
import { Account, NetworkType } from 'nem2-sdk';

const privateKey = 'aaaaaaaaaaeeeeeeeeeebbbbbbbbbb5555555555dddddddddd1111111111aaee';
const onwerAccount = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
const apostilleAccount = ApostilleAccount
  .create('.N:@N%5SVjj3Wkmr-', onwerAccount);

console.log(apostilleAccount.account.privateKey);
console.log(apostilleAccount.publicAccount.publicKey);
console.log(apostilleAccount.address.pretty());
