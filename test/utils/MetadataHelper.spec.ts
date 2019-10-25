import { MetadataKeyHelper } from '../../src/utils/MetadataKeyHelper';
import { UInt64 } from 'nem2-sdk';

describe('metadata key mapping should work', () => {
  it('should return correct key of author', () => {
    const expectKey = 'Author';
    const uintValue = UInt64.fromHex('B8A2B7186A421369');
    expect(MetadataKeyHelper.getKeyNameWithKeyId(uintValue)).toMatch(expectKey);
  });

  it('should return correct key of title', () => {
    const expectKey = 'Title';
    const uintValue = UInt64.fromHex('A801BEEB799108BC');
    expect(MetadataKeyHelper.getKeyNameWithKeyId(uintValue)).toMatch(expectKey);
  });

  it('should return correct key of tag', () => {
    const expectKey = 'Tag';
    const uintValue = UInt64.fromHex('EB9BDBED96B9EC45');
    expect(MetadataKeyHelper.getKeyNameWithKeyId(uintValue)).toMatch(expectKey);
  });

  it('should return correct key of description', () => {
    const expectKey = 'Description';
    const uintValue = UInt64.fromHex('9E30087F94867CF9');
    expect(MetadataKeyHelper.getKeyNameWithKeyId(uintValue)).toMatch(expectKey);
  });

  it('should return correct key of filename', () => {
    const expectKey = 'Filename';
    const uintValue = UInt64.fromHex('D298EBA89C34461D');
    expect(MetadataKeyHelper.getKeyNameWithKeyId(uintValue)).toMatch(expectKey);
  });

  it('should return correct key of originUrl', () => {
    const expectKey = 'OriginUrl';
    const uintValue = UInt64.fromHex('9FA2FCC0B88961FC');
    expect(MetadataKeyHelper.getKeyNameWithKeyId(uintValue)).toMatch(expectKey);
  });

  it('should return correct key of certificateUrl', () => {
    const expectKey = 'CertificateUrl';
    const uintValue = UInt64.fromHex('92F13A7B7DF2F7A9');
    expect(MetadataKeyHelper.getKeyNameWithKeyId(uintValue)).toMatch(expectKey);
  });

  it('should return hex value of Extra key', () => {
    const expectKey = 'FFFFFFFFFFFFFFFF';
    const uintValue = UInt64.fromHex(expectKey);
    expect(MetadataKeyHelper.getKeyNameWithKeyId(uintValue)).toMatch(expectKey);
  });
});
