import { Account, PublicAccount, Address } from 'nem2-sdk';
import { createHash } from 'crypto';

const fixPrivateKey = (privateKey) => {
  // tslint:disable-next-line:max-line-length
  return (`0000000000000000000000000000000000000000000000000000000000000000${privateKey.replace(/^00/, '')}`)
    .slice(-64);
};

export class ApostilleAccount {
  public static create(filename: string, ownerAccount: Account) {
    const networkType = ownerAccount.address.networkType;
    const hash = createHash('sha256');
    hash.update(filename);
    const filenameHash = hash.digest('hex');
    const signedMessage = ownerAccount.signData(filenameHash);
    const privateKey = fixPrivateKey(signedMessage);
    const apostilleAccount = Account.createFromPrivateKey(privateKey, networkType);
    return new ApostilleAccount(apostilleAccount);
  }

  public readonly publicAccount: PublicAccount;
  public readonly address: Address;

  public constructor(public readonly account: Account) {
    this.publicAccount = account.publicAccount;
    this.address = account.address;
  }
}
