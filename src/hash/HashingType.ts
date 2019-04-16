export enum HashingType {
  md5       = '81',
  sha1      = '82',
  sha256    = '83',
  keccak256 = '88',
  keccak512 = '89',
  sha3_256  = '90',
  sha3_512  = '91',
}

export namespace HashingType {
  export function hashTypeStrToType(typeStr: string) {
    switch (typeStr) {
    case '81': return HashingType.md5;
    case '82': return HashingType.sha1;
    case '83': return HashingType.sha256;
    case '88': return HashingType.keccak256;
    case '89': return HashingType.keccak512;
    case '90': return HashingType.sha3_256;
    case '91': return HashingType.sha3_512;
    default: throw Error('unmatched hashing type');
    }
  }
}
