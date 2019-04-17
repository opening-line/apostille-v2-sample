import { HashFunction } from './HashFunction';
import { HashingType } from './HashingType';
import { createHash } from 'crypto';

export class SHA1 extends HashFunction {

  constructor() {
    super(HashingType.sha1);
  }

  public hashing(data: string) {
    const hash = createHash('sha1');
    hash.update(data);
    return hash.digest('hex');
  }
}
