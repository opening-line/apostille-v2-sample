import { HashFunction } from './HashFunction';
import { HashingType } from './HashingType';
import { keccak256 } from 'js-sha3';

export class KECCAK256 extends HashFunction {

  constructor() {
    super(HashingType.keccak256);
  }

  public hashing(data: string) {
    return keccak256.update(data).hex();
  }
}
