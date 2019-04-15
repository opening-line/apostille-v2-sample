import { HashFunction } from './HashFunction';
import { NetworkType, Account } from 'nem2-sdk';
import { createHash } from 'crypto';

export class SHA256 extends HashFunction {

  constructor() {
    super('83');
  }

  public signedHashing(data: string, signerPrivateKey: string, networkType: NetworkType) {
    const account = Account.createFromPrivateKey(signerPrivateKey, networkType);
    const hashedData = this.hashing(data);
    return this.checksum + account.signData(hashedData);
  }

  private hashing(data: string) {
    const hash = createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  }
}
