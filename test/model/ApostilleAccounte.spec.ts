import { Account, NetworkType } from 'nem2-sdk';
import { ApostilleAccount } from '../../src/model/ApostilleAccount';

const seed = '.N:@N%5SVjj3Wkmr-';
const ownerKey = 'aaaaaaaaaaeeeeeeeeeebbbbbbbbbb5555555555dddddddddd1111111111aaee';

describe('ApostilleAccount class should work properly with MIJIN_TEST Network Type', () => {
  const ownerAccount = Account.createFromPrivateKey(ownerKey, NetworkType.MIJIN_TEST);
  const apostilleAccount = ApostilleAccount.create(seed, ownerAccount);

  it('ApostilleAccount.create with MIJIN_TEST Network should return correct Account', () => {
    expect(apostilleAccount.account.privateKey).toMatch(
      'E26A117C038068239E312E04F2B43DCC839D31BE7471D04DCCE905C2DC164107'
    );
  });
});
