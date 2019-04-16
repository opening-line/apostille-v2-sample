import { HashingType } from './HashingType';
import { SHA256 } from './sha256';

export class HashFunctionCreator {
  static create(type: HashingType) {
    console.log(type);
    // TODO:
    return new SHA256();
  }
}
