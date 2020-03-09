import { SHA256, MD5, SHA1, KECCAK256, KECCAK512, SHA3_256, SHA3_512 } from '../../src/hash/hash';
import { NetworkType } from 'symbol-sdk';

describe('Generate correct hash using MIJIN_TEST network type', () => {
  const signerPrivateKey = 'F1E7660DB9EF5E73203881304F31B7CCDF167A08055013A633D098EBD94FD36F';
  const data = 'I am legen wait for it dary';

  it('generate hash with MD5', () => {
    const md5 = new MD5();
    const hash = '5bd55f933c48f7745e16cbc20facc571';
    expect(md5.hashing(data)).toEqual(hash);
  });

  it('generate signed hash with MD5', () => {
    const md5 = new MD5();
    // tslint:disable-next-line:max-line-length
    const hash = 'E0335394DDD17FBA9BAA3C76D07159F945B1EF33E47930F5FBAA2BB882F11BB4E549E7B57B4C88B98689EDF687101BE6C7344D50E1C509DF265221DC05D57207';
    expect(md5.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with MD5', () => {
    const md5 = new MD5();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e545981E0335394DDD17FBA9BAA3C76D07159F945B1EF33E47930F5FBAA2BB882F11BB4E549E7B57B4C88B98689EDF687101BE6C7344D50E1C509DF265221DC05D57207';
    expect(md5.apostilleTransactionMessage(data,
                                           signerPrivateKey,
                                           NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate hash with SHA1', () => {
    const sha1 = new SHA1();
    const hash = 'f8ef2e25de9bf2857311c523d6f0ba6b2d050582';
    expect(sha1.hashing(data)).toEqual(hash);
  });

  it('generate signed hash with SHA1', () => {
    const sha1 = new SHA1();
    // tslint:disable-next-line:max-line-length
    const hash = 'C273EA42A44F4966FED943BB9EF1C3ABFE2ABA38C7524BB6C8ACA086ECB22248E4B8AED6403D636E0B54EABBB1284235A491A69C192FE25EFF564F52C09CD600';
    expect(sha1.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with SHA1', () => {
    const sha1 = new SHA1();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e545982C273EA42A44F4966FED943BB9EF1C3ABFE2ABA38C7524BB6C8ACA086ECB22248E4B8AED6403D636E0B54EABBB1284235A491A69C192FE25EFF564F52C09CD600';
    expect(sha1.apostilleTransactionMessage(data,
                                            signerPrivateKey,
                                            NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate checksum of apostille transaction message with SHA256', () => {
    const sha256 = new SHA256();
    const checksum = 'fe4e545983';
    expect(sha256.apostilleTransactionMessage(data, signerPrivateKey, NetworkType.MIJIN_TEST).
    substring(0, 10)).toEqual(checksum);
  });

  it('generates apostille transaction message with SHA256', () => {
    const sha256 = new SHA256();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e5459831CF9E29E3BFDE4CBA65C21EDEA5319A8E7CBE49F332AAF563D8C908EA1CC273DE337962081B0301F789CAFF9B6003C5BD94DF5F20B63FDF1399640514FA2CC00';
    expect(sha256.apostilleTransactionMessage(data, signerPrivateKey, NetworkType.MIJIN_TEST))
    .toEqual(hash);
  });

  it('generates signed hash with SHA256', () => {
    const sha256 = new SHA256;
    // tslint:disable-next-line:max-line-length
    const hash = '1CF9E29E3BFDE4CBA65C21EDEA5319A8E7CBE49F332AAF563D8C908EA1CC273DE337962081B0301F789CAFF9B6003C5BD94DF5F20B63FDF1399640514FA2CC00';
    expect(sha256.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generates hash with SHA256', () => {
    const sha256 = new SHA256();
    const hash = '336eda1a928c499c7cce89373580ed0ba5ab374af90553f0a25e5e32964bb072';
    expect(sha256.hashing(data)).toEqual(hash);
  });

  it('generate hash with keccak256', () => {
    const keccak256 = new KECCAK256();
    const hash = '1898ef04e8a181bbaa0d5a047895b1e35c41e31ad046aafe16aa8e4a259f9b0d';
    expect(keccak256.hashing(data)).toEqual(hash);
  });

  it('generate signed hash with keccak256', () => {
    const keccak256 = new KECCAK256();
    // tslint:disable-next-line:max-line-length
    const hash = 'BAD74673DF41EF7BEC76A84DF4144C9C02EC7E3555FF8D677BA0A4FE6BC443DAB0A36840BC6D506B332B48953AB347DADA803C2080984AC54FC2B16B59B9330B';
    expect(keccak256.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with keccak256', () => {
    const keccak256 = new KECCAK256();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e545988BAD74673DF41EF7BEC76A84DF4144C9C02EC7E3555FF8D677BA0A4FE6BC443DAB0A36840BC6D506B332B48953AB347DADA803C2080984AC54FC2B16B59B9330B';
    expect(keccak256.apostilleTransactionMessage(data,
                                                 signerPrivateKey,
                                                 NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate hash with keccak512', () => {
    const keccak512 = new KECCAK512();
    // tslint:disable-next-line:max-line-length
    const hash = '5dcecc77d075f0ba5ff60d8a6c5d15c1f737998b389c2a24ea741b983c6a156c4b2fff45a143ae87ab1942f1ccd7c288e77b8777915aa7c704cf6c1b88664bf8';
    expect(keccak512.hashing(data)).toEqual(hash);
  });

  it('generate signed hash with keccak512', () => {
    const keccak512 = new KECCAK512();
    // tslint:disable-next-line:max-line-length
    const hash = '754C17936BB1ED1E71EECAAC62A31D660988FE7BE9BE1006144C18F77649743F7A771E27C043E106382DB8B789947B5962486BCA9AC862A4622D2036A4AC6D0F';
    expect(keccak512.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with keccak512', () => {
    const keccak512 = new KECCAK512();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e545989754C17936BB1ED1E71EECAAC62A31D660988FE7BE9BE1006144C18F77649743F7A771E27C043E106382DB8B789947B5962486BCA9AC862A4622D2036A4AC6D0F';
    expect(keccak512.apostilleTransactionMessage(data,
                                                 signerPrivateKey,
                                                 NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate hash with sha3_256', () => {
    // tslint:disable-next-line:variable-name
    const sha3_256 = new SHA3_256();
    // tslint:disable-next-line:max-line-length
    const hash = '5cf87d7284b91dead5535903d952670270ff994248392cd1fd3b7d811a40e64d';
    expect(sha3_256.hashing(data)).toEqual(hash);
  });

  it('generate signed hash with sha3_256', () => {
    // tslint:disable-next-line:variable-name
    const sha3_256 = new SHA3_256();
    // tslint:disable-next-line:max-line-length
    const hash = '7CC13B10CBE2F9BFADFE6EC8CBCDDE1E996B05EA4354CD3508A7642B4D342D5807137DE096D0B16026F6795C5DA339E605A6901F356830A8E68C3C506891580D';
    expect(sha3_256.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with sha3_256', () => {
    // tslint:disable-next-line:variable-name
    const sha3_256 = new SHA3_256();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e5459907CC13B10CBE2F9BFADFE6EC8CBCDDE1E996B05EA4354CD3508A7642B4D342D5807137DE096D0B16026F6795C5DA339E605A6901F356830A8E68C3C506891580D';
    expect(sha3_256.apostilleTransactionMessage(data,
                                                signerPrivateKey,
                                                NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate hash with sha3_512', () => {
    // tslint:disable-next-line:variable-name
    const sha3_256 = new SHA3_512();
    // tslint:disable-next-line:max-line-length
    const hash = '509bac41c330c66d7eb4b519172eab319fbdafc6dc360b00c62f74445cdb42c8563a66a0992d7e3bd595cc782d007ce6d200affe0ba9714706c451e4cfb46020';
    expect(sha3_256.hashing(data)).toEqual(hash);
  });

  it('generate signed hash with sha3_512', () => {
    // tslint:disable-next-line:variable-name
    const sha3_256 = new SHA3_512();
    // tslint:disable-next-line:max-line-length
    const hash = '4174CE7B2A84BDCE3CF666A67765DA29386FAB4C71685D1C03ED741A1271C5910E683C20C5C38508A37CD94EF76828ADBA95D6F6D99D6EB4502F9CB899F22204';
    expect(sha3_256.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with sha3_512', () => {
    // tslint:disable-next-line:variable-name
    const sha3_256 = new SHA3_512();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e5459914174CE7B2A84BDCE3CF666A67765DA29386FAB4C71685D1C03ED741A1271C5910E683C20C5C38508A37CD94EF76828ADBA95D6F6D99D6EB4502F9CB899F22204';
    expect(sha3_256.apostilleTransactionMessage(data,
                                                signerPrivateKey,
                                                NetworkType.MIJIN_TEST)).toEqual(hash);
  });
});
