import { ApostilleAccount, SignType } from '../model/ApostilleAccount';
import { NetworkType, Account, PublicAccount,
  AggregateTransaction, Deadline,
  HashLockTransaction, NetworkCurrencyMosaic, UInt64,
  TransactionService } from 'nem2-sdk';
import { HashFunction } from '../hash/HashFunction';
import { AnnounceResult } from '../model/model';
import { GeneralApostilleService } from './GeneralApostilleService';

export class UpdateApostilleService extends GeneralApostilleService {

  public static create(data: string,
                       hashFunction: HashFunction,
                       ownerPrivateKey: string,
                       apostilleAccount: Account | PublicAccount,
                       apiEndpoint: string,
                       networkType: NetworkType,
                       networkGenerationHash: string,
                       feeMultiplier?: number) {
    const service = new UpdateApostilleService(data, hashFunction, ownerPrivateKey,
                                               apostilleAccount, apiEndpoint, networkType,
                                               networkGenerationHash, feeMultiplier);
    service.createCoreTransaction();
    return service;
  }

  constructor(data: string,
              hashFunction: HashFunction,
              ownerPrivateKey: string,
              apostilleAccount: Account | PublicAccount,
              apiEndpoint: string,
              networkType: NetworkType,
              networkGenerationHash: string,
              feeMultiplier?: number) {
    super(data, hashFunction, ownerPrivateKey,
          apiEndpoint, networkType,
          networkGenerationHash, feeMultiplier);
    this.apostilleAccount = ApostilleAccount.createWithExistAccount(apostilleAccount);
  }

  public async announce(webSocket?: any) {
    const signType = await this.apostilleAccount
      .needSignType(this.apiEndpoint, this.ownerAccount.publicKey);
    if (signType === SignType.NeedOtherCosignatory) {
      return this.announceBounded(webSocket);
    }
    return this.announceComplete(webSocket);
  }

  private announceBounded(webSocket?: any) {
    const transactionRepository = this.repositoryFactory.createTransactionRepository();
    const receiptRepository = this.repositoryFactory.createReceiptRepository();
    const transactionService = new TransactionService(transactionRepository, receiptRepository);
    const listener = this.listener(webSocket);

    const aggregateTx = this.createBoundedTransaction();
    const signedTx = this.ownerAccount.sign(aggregateTx, this.networkGenerationHash);
    const hashLockTx = HashLockTransaction.create(
      Deadline.create(),
      NetworkCurrencyMosaic.createRelative(10),
      UInt64.fromUint(480),
      signedTx,
      this.networkType,
    ).setMaxFee(this.feeMultiplier) as HashLockTransaction;
    const hashLockSigned = this.ownerAccount.sign(hashLockTx, this.networkGenerationHash);

    return new Promise<AnnounceResult>((resolve, reject) => {
      listener.open().then(() => {
        transactionService.announceHashLockAggregateBonded(hashLockSigned,
                                                           signedTx, listener).subscribe(
          (_) => {
            listener.close();
            resolve(this.announceResult(signedTx));
          },
          (err) => {
            listener.close();
            reject(err);
          },
        );
      });
    });
  }

  public createBoundedTransaction() {
    const transaction = AggregateTransaction.createBonded(
      Deadline.create(),
      this.innerTransactions(),
      this.networkType,
      [],
    ).setMaxFee(this.feeMultiplier) as AggregateTransaction;
    return transaction;
  }

  public async isNeedApostilleAccountSign() {
    const signType = await this.apostilleAccount
      .needSignType(this.apiEndpoint, this.ownerAccount.publicKey);
    if (signType === SignType.ApostilleAccountOnly
      && this.announcePublicSinkTransaction) {
      return true;
    }
    return false;
  }

  public addAssignOwnershipTransaction() {
    throw Error('Assign ownership can not use on update');
  }

  public addMetadataTransactions() {
    throw Error('Metadata can not use on update');
  }
}
