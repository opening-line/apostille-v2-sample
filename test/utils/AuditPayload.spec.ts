import { AuditPayload } from '../../src/utils/utils';
import { NetworkType } from 'nem2-sdk';

describe('audit apostille using MIJIN_TEST network type', () => {
  const ownerPublicKey = 'E279A49F4B4DAD6768717B2488F476467F3E6CBA0C8C7592C6E7CB517DB60AE8';
  // tslint:disable-next-line:max-line-length
  const fileHash = 'fe4e5459838B9889D03C07ABF5EE7941AC4E0C30276EA16FEE130CE6E94A7DA29F4173A423FEB34DA73C9CB358B31548826495A5ABA84830E50C7AC673D539A542D590FD0F';

  it('success audit with SHA256', () => {
    const data = 'aaaaaaaaa';
    expect(AuditPayload.audit(data, fileHash, ownerPublicKey, NetworkType.MIJIN_TEST)).toBeTruthy();
  });

  it('failed audit with SHA256', () => {
    const data = 'bbbbbbbb';
    expect(AuditPayload.audit(data, fileHash, ownerPublicKey, NetworkType.MIJIN_TEST)).toBeFalsy();
  });
});
