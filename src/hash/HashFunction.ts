import { NetworkType, Account } from 'nem2-sdk';

export abstract class HashFunction {
  constructor(public readonly typeHex: string) { }

  public abstract hashing(data: string);

  public checksum = `fe4e5459${this.typeHex}`;

  public signedHashing(data: string, signerPrivateKey: string, networkType: NetworkType) {
    const account = Account.createFromPrivateKey(signerPrivateKey, networkType);
    const hashedData = this.hashing(data);
    return account.signData(hashedData);
  }

  public apostilleTransactionMessage(data: string,
                                     signerPrivateKey: string,
                                     networkType: NetworkType) {
    const signedHash = this.signedHashing(data, signerPrivateKey, networkType);
    return `${this.checksum}${signedHash}`;
  }
}
