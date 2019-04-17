import { HashFunctionCreator, HashingType, MD5, SHA1, SHA256
  , KECCAK256, KECCAK512, SHA3_256, SHA3_512 } from '../../src/hash/hash';

describe('Generate correct HashFunction', () => {
  it('generate MD5', () => {
    expect(HashFunctionCreator.create(HashingType.md5)).toBeInstanceOf(MD5);
  });

  it('generate SHA1', () => {
    expect(HashFunctionCreator.create(HashingType.sha1)).toBeInstanceOf(SHA1);
  });

  it('generate SHA256', () => {
    expect(HashFunctionCreator.create(HashingType.sha256)).toBeInstanceOf(SHA256);
  });

  it('generate keccak256', () => {
    expect(HashFunctionCreator.create(HashingType.keccak256)).toBeInstanceOf(KECCAK256);
  });

  it('generate keccak512', () => {
    expect(HashFunctionCreator.create(HashingType.keccak512)).toBeInstanceOf(KECCAK512);
  });

  it('generate SHA3_256', () => {
    expect(HashFunctionCreator.create(HashingType.sha3_256)).toBeInstanceOf(SHA3_256);
  });

  it('generate SHA3_512', () => {
    expect(HashFunctionCreator.create(HashingType.sha3_512)).toBeInstanceOf(SHA3_512);
  });
});
