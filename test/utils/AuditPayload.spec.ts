import { AuditPayload } from '../../src/utils/utils';
import { NetworkType } from 'symbol-sdk';

describe('audit apostille using MIJIN_TEST network type', () => {
  const ownerPublicKey = '3BE8CD6EF825078ECF0364154427CFAD3AD970F97604D4B8B696A64F052BAD39';
  // tslint:disable-next-line:max-line-length
  const fileHash = 'fe4e5459831CF9E29E3BFDE4CBA65C21EDEA5319A8E7CBE49F332AAF563D8C908EA1CC273DE337962081B0301F789CAFF9B6003C5BD94DF5F20B63FDF1399640514FA2CC00';

  it('success audit with SHA256', () => {
    const data = 'I am legen wait for it dary';
    expect(AuditPayload.audit(data, fileHash, ownerPublicKey, NetworkType.MIJIN_TEST)).toBeTruthy();
  });

  it('failed audit with SHA256', () => {
    const data = 'bbbbbbbb';
    expect(AuditPayload.audit(data, fileHash, ownerPublicKey, NetworkType.MIJIN_TEST)).toBeFalsy();
  });
});
