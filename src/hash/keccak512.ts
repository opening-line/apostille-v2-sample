import { HashFunction } from './HashFunction';
import { HashingType } from './HashingType';
import { keccak512 } from 'js-sha3';

export class KECCAK512 extends HashFunction {

  constructor() {
    super(HashingType.keccak512);
  }

  public hashing(data: string) {
    return keccak512.update(data).hex();
  }
}
