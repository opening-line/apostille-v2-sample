import { HashFunction } from './HashFunction';
import { HashingType } from './HashingType';
import { sha3_256 } from 'js-sha3';

export class SHA3_256 extends HashFunction {

  constructor() {
    super(HashingType.sha3_256);
  }

  public hashing(data: string) {
    return sha3_256.update(data).hex();
  }
}
