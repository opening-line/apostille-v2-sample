import { SHA256, MD5, SHA1, KECCAK256, KECCAK512, SHA3_256, SHA3_512 } from '../../src/hash/hash';
import { NetworkType } from 'nem2-sdk';

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
    const hash = 'FE2D021949C6FE3B2552B7FE197EE67A1A07A8EB66E231EC2AAD9BFED66ED66BF28B2F7E86E86FEB66785AFD9C071E5BAC9EB1B43B9155A2BB1BD5E6C85E0E0E';
    expect(md5.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with MD5', () => {
    const md5 = new MD5();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e545981FE2D021949C6FE3B2552B7FE197EE67A1A07A8EB66E231EC2AAD9BFED66ED66BF28B2F7E86E86FEB66785AFD9C071E5BAC9EB1B43B9155A2BB1BD5E6C85E0E0E';
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
    const hash = 'F0C8290E45664E78D1825BB24CC067A4273E550303AE8D014FC6491B9719512BF9559353907D49466001DCAAC3C2C45D222315175EDDA82DFC6F5F7802573D04';
    expect(sha1.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with SHA1', () => {
    const sha1 = new SHA1();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e545982F0C8290E45664E78D1825BB24CC067A4273E550303AE8D014FC6491B9719512BF9559353907D49466001DCAAC3C2C45D222315175EDDA82DFC6F5F7802573D04';
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
    const hash = 'fe4e545983CEEC521C2F006B00F68C913DB59773E26F6FDFA4FDBC1FDD6A20004E89C66BDCB9DDF430AB7F5F2857BB3A9BADEC52C77584DB119281568EC1AB95ACB815F30F';
    expect(sha256.apostilleTransactionMessage(data, signerPrivateKey, NetworkType.MIJIN_TEST))
    .toEqual(hash);
  });

  it('generates signed hash with SHA256', () => {
    const sha256 = new SHA256;
    // tslint:disable-next-line:max-line-length
    const hash = 'CEEC521C2F006B00F68C913DB59773E26F6FDFA4FDBC1FDD6A20004E89C66BDCB9DDF430AB7F5F2857BB3A9BADEC52C77584DB119281568EC1AB95ACB815F30F';
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
    const hash = '86AB714B482A9DF4F6387DA5AE748DB78E49C27B24B3284F7E4B9BB55A8BD78A981B25EEAC70E5AE3814B75DCED68D4AFB6581BCC8F768DF09192CF88509C90D';
    expect(keccak256.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with keccak256', () => {
    const keccak256 = new KECCAK256();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e54598886AB714B482A9DF4F6387DA5AE748DB78E49C27B24B3284F7E4B9BB55A8BD78A981B25EEAC70E5AE3814B75DCED68D4AFB6581BCC8F768DF09192CF88509C90D';
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
    const hash = '33E11AEF0E0D940CC4B7533578D12D86A9654DC3C7241BD8FCDE3AD2552E19AAB4F257874E5D0500FA22013E9035E1ADF821A174148806FEB5853EAF5D80EC0E';
    expect(keccak512.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with keccak512', () => {
    const keccak512 = new KECCAK512();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e54598933E11AEF0E0D940CC4B7533578D12D86A9654DC3C7241BD8FCDE3AD2552E19AAB4F257874E5D0500FA22013E9035E1ADF821A174148806FEB5853EAF5D80EC0E';
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
    const hash = '4B9C121282E15B76D0F005746E364D75398B8446881762F64231C8E3731864596334CF0CFEA7208525F66E64C1B7C690D39681CF5927001FD3C68E63AAA75A0F';
    expect(sha3_256.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with sha3_256', () => {
    // tslint:disable-next-line:variable-name
    const sha3_256 = new SHA3_256();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e5459904B9C121282E15B76D0F005746E364D75398B8446881762F64231C8E3731864596334CF0CFEA7208525F66E64C1B7C690D39681CF5927001FD3C68E63AAA75A0F';
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
    const hash = '67D5E936775F973F9B111A4888DFC6F62EEFFBDE872599E5878803F4E51299ACCE2875970F09060CA50E417BCA9AAB860FA6EA18A1C772673C8B71410A38FB06';
    expect(sha3_256.signedHashing(data, signerPrivateKey, NetworkType.MIJIN_TEST)).toEqual(hash);
  });

  it('generate apostille transaction message with sha3_512', () => {
    // tslint:disable-next-line:variable-name
    const sha3_256 = new SHA3_512();
    // tslint:disable-next-line:max-line-length
    const hash = 'fe4e54599167D5E936775F973F9B111A4888DFC6F62EEFFBDE872599E5878803F4E51299ACCE2875970F09060CA50E417BCA9AAB860FA6EA18A1C772673C8B71410A38FB06';
    expect(sha3_256.apostilleTransactionMessage(data,
                                           signerPrivateKey,
                                           NetworkType.MIJIN_TEST)).toEqual(hash);
  });
});
