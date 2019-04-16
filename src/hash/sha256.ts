import { HashFunction } from './HashFunction';
import { NetworkType, Account } from 'nem2-sdk';
import { createHash } from 'crypto';
import { HashingType } from './HashingType';

export class SHA256 extends HashFunction {

  constructor() {
    super(HashingType.sha256);
  }

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

  public hashing(data: string) {
    const hash = createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  }
}
