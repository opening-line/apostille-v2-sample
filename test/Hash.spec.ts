import { SHA256 } from '../src/hash/hash';
import { NetworkType } from 'nem2-sdk';

describe('Generate correct hash using MIJIN_TEST network type', () => {
  const signerPrivateKey = 'F1E7660DB9EF5E73203881304F31B7CCDF167A08055013A633D098EBD94FD36F';
  const data = 'I am legen wait for it dary';
  it ('generate checksum of apostille transaction message with SHA256', () => {
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
});
