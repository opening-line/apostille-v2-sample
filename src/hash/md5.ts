import { HashFunction } from './HashFunction';
import { HashingType } from './HashingType';
import { createHash } from 'crypto';

export class MD5 extends HashFunction {

  constructor() {
    super(HashingType.md5);
  }

  public hashing(data: string) {
    const hash = createHash('md5');
    hash.update(data);
    return hash.digest('hex');
  }
}
