import { HashingType } from './HashingType';
import { SHA256 } from './sha256';
import { MD5 } from './md5';
import { SHA1 } from './sha1';
import { KECCAK256 } from './keccak256';
import { KECCAK512 } from './keccak512';
import { SHA3_256 } from './sha3_256';
import { SHA3_512 } from './sha3_512';

export class HashFunctionCreator {
  static create(type: HashingType) {
    switch (type) {
    case HashingType.md5:       return new MD5();
    case HashingType.sha1:      return new SHA1();
    case HashingType.sha256:    return new SHA256();
    case HashingType.keccak256: return new KECCAK256();
    case HashingType.keccak512: return new KECCAK512();
    case HashingType.sha3_256:  return new SHA3_256();
    case HashingType.sha3_512:  return new SHA3_512();
    default: throw Error('hashing type unmatched');
    }
  }
}
