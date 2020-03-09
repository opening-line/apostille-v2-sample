import { Account, NetworkType } from 'symbol-sdk';
import { ApostilleAccount } from '../../src/model/ApostilleAccount';

const seed = '.N:@N%5SVjj3Wkmr-';
const ownerKey = 'aaaaaaaaaaeeeeeeeeeebbbbbbbbbb5555555555dddddddddd1111111111aaee';

describe('ApostilleAccount class should work properly with MIJIN_TEST Network Type', () => {
  const ownerAccount = Account.createFromPrivateKey(ownerKey, NetworkType.MIJIN_TEST);
  const apostilleAccount = ApostilleAccount.create(seed, ownerAccount);

  it('ApostilleAccount.create with MIJIN_TEST Network should return correct Account', () => {
    expect(apostilleAccount.account!.privateKey).toMatch(
      'CBA974CC673116C25C74C1B0E4C05358596039CD04969DE8B1D60C3497B04C00',
    );
  });
});
