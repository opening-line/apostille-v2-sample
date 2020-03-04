import { Account, PublicAccount, Address, RepositoryFactoryHttp } from 'nem2-sdk';
import { createHash } from 'crypto';

const fixPrivateKey = (privateKey) => {
  // tslint:disable-next-line:max-line-length
  return (`0000000000000000000000000000000000000000000000000000000000000000${privateKey.replace(/^00/, '')}`)
    .slice(-64);
};

export enum SignType {
  ApostilleAccountOnly,
  OneCosignatoryOnly,
  NeedOtherCosignatory,
  CannotSign,
}

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

  public static createWithExistAccount(existAccount: Account | PublicAccount) {
    return new ApostilleAccount(existAccount);
  }

  public readonly account?: Account;
  public readonly publicAccount: PublicAccount;
  public readonly address: Address;

  public constructor(account: Account | PublicAccount) {
    if (account instanceof Account) {
      this.account = account;
      this.publicAccount = account.publicAccount;
      this.address = account.address;
    } else {
      this.publicAccount = account;
      this.address = account.address;
    }
  }

  public async needSignType(networkUrl: string, cosignatoryPublicKey?: string) {
    try {
      const repogitoryFactory = new RepositoryFactoryHttp(networkUrl);
      const multisigRepository = repogitoryFactory.createMultisigRepository();
      const multsigInfo = await multisigRepository.getMultisigAccountInfo(this.address).toPromise();
      if (multsigInfo.cosignatories.length > 0) {
        const check = multsigInfo.cosignatories.some(
          publicAccount => publicAccount.publicKey === cosignatoryPublicKey,
        );
        if (!check) {
          return SignType.CannotSign;
        }
        if (multsigInfo.minApproval === 1) {
          return SignType.OneCosignatoryOnly;
        }
        return SignType.NeedOtherCosignatory;
      }
      return SignType.ApostilleAccountOnly;
    } catch (err) {
      return SignType.ApostilleAccountOnly;
    }
  }
}
