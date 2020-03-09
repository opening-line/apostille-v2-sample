import { InnerTransactionService } from '../../src/service/InnerTransactionService';
import { NetworkType, TransferTransaction, Account, MultisigAccountModificationTransaction } from 'symbol-sdk';
import { SHA256 } from '../../src/hash/hash';
import { ApostilleAccount, Sinks } from '../../src/model/model';

describe('Inner transaction class should work', () => {
  const ownerPrivateKey = 'aaaaaaaaaaeeeeeeeeeebbbbbbbbbb5555555555dddddddddd1111111111aaee';
  const data = 'hello apostille';
  const filename = 'sample.txt';
  const networkType = NetworkType.MIJIN_TEST;
  const sha256 = new SHA256();
  const metadata = { description: 'hello' };
  const ownerAccount = Account.createFromPrivateKey(ownerPrivateKey, networkType);
  const apostilleAccount = ApostilleAccount.create(filename, ownerAccount);

  it('only core transaction does not have to apostille account sign', () => {
    const service = InnerTransactionService.create(data, filename,
                                                   sha256, ownerPrivateKey, networkType);
    service.createCoreTransaction();
    expect(service.isNeedApostilleAccountSign()).toBeFalsy();
  });

  it('If announce public sink transaction is contained then apostille account should sign', () => {
    const service = InnerTransactionService.create(data, filename,
                                                   sha256, ownerPrivateKey, networkType);
    service.createCoreTransaction();
    service.addAnnouncePublicSinkTransaction();
    expect(service.isNeedApostilleAccountSign()).toBeTruthy();
  });

  it('If assign ownership transaction is contained then apostille account should sign', () => {
    const service = InnerTransactionService.create(data, filename,
                                                   sha256, ownerPrivateKey, networkType);
    service.createCoreTransaction();
    service.addAssignOwnershipTransaction();
    expect(service.isNeedApostilleAccountSign()).toBeTruthy();
  });

  it('If metadata transaction is contained then apostille account should sign', () => {
    const service = InnerTransactionService.create(data, filename,
                                                   sha256, ownerPrivateKey, networkType);
    service.createCoreTransaction();
    service.addMetadataTransactions(metadata);
    expect(service.isNeedApostilleAccountSign()).toBeTruthy();
  });

  it('core transaction should right contents', () => {
    const service = InnerTransactionService.create(data, filename,
                                                   sha256, ownerPrivateKey, networkType);
    service.createCoreTransaction();
    expect(service.coreTransaction!.signer!.publicKey).toEqual(ownerAccount.publicKey);

    const tx = service.coreTransaction as TransferTransaction;
    expect(tx.recipientAddress).toEqual(apostilleAccount.address);

    const expectMessage = sha256.apostilleTransactionMessage(data, ownerPrivateKey, networkType);
    expect(tx.message.payload).toEqual(expectMessage);
  });

  it('announce public sink tx should right contents', () => {
    const service = InnerTransactionService.create(data, filename,
                                                   sha256, ownerPrivateKey, networkType);
    service.addAnnouncePublicSinkTransaction();

    expect(service.announcePublicSinkTransaction!.signer!.publicKey)
    .toEqual(apostilleAccount.publicAccount.publicKey);

    const sinkTx = service.announcePublicSinkTransaction as TransferTransaction;
    expect(sinkTx.recipientAddress).toEqual(Sinks.getAddress(networkType));
    const expectMessage = sha256.apostilleTransactionMessage(data, ownerPrivateKey, networkType);
    expect(sinkTx.message.payload).toEqual(expectMessage);
  });

  it('assign ownership tx should right contents', () => {
    const service = InnerTransactionService.create(data, filename,
                                                   sha256, ownerPrivateKey, networkType);
    service.addAssignOwnershipTransaction();

    const ownerShipTx = service.assignOwnershipTransaction as
    MultisigAccountModificationTransaction;
    expect(ownerShipTx.minApprovalDelta).toEqual(1);
    expect(ownerShipTx.minRemovalDelta).toEqual(1);
    expect(ownerShipTx.publicKeyAdditions[0]).toEqual(ownerAccount.publicAccount);
  });
});
