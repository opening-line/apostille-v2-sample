import { ApostilleAccount } from '../model/ApostilleAccount';
import { InnerTransaction, NetworkType,
   Deadline, MultisigAccountModificationTransaction,
    TransactionHttp } from 'nem2-sdk';
import { HashFunction } from '../hash/hash';
import { MetadataTransaction } from '../model/MetadataTransaction';
import { AnnounceResult } from '../model/AnnounceResult';
import { GeneralApostilleService } from './GeneralApostilleService';

export class CreateApostilleService extends GeneralApostilleService {

  private metadataTransactions?: InnerTransaction[];
  private assignOwnershipTransaction?: InnerTransaction;

  public static create(data: string,
                       filename: string,
                       hashFunction: HashFunction,
                       ownerPrivateKey: string,
                       apiEndpoint: string,
                       networkType: NetworkType,
                       networkGenerationHash: string,
                       feeMultiplier?: number) {
    const service = new CreateApostilleService(data, filename,
                                               hashFunction, ownerPrivateKey, apiEndpoint,
                                               networkType, networkGenerationHash, feeMultiplier);
    return service;
  }

  constructor(data: string,
              filename,
              hashFunction: HashFunction,
              ownerPrivateKey: string,
              apiEndpoint: string,
              networkType: NetworkType,
              networkGenerationHash: string,
              feeMultiplier?: number,
    ) {
    super(data, hashFunction,
          ownerPrivateKey, apiEndpoint, networkType,
          networkGenerationHash, feeMultiplier);
    this.apostilleAccount = ApostilleAccount.create(filename, this.ownerAccount);
  }

  public addAssignOwnershipTransaction() {
    const transaction = MultisigAccountModificationTransaction.create(
      Deadline.create(),
      1,
      1,
      [this.ownerAccount.publicAccount],
      [],
      this.networkType,
    );
    this.assignOwnershipTransaction = transaction.toAggregate(this.apostilleAccount.publicAccount);
  }

  public addMetadataTransactions(metadata: Object) {
    const transactions = MetadataTransaction
    .objectToMetadataTransactions(metadata,
                                  this.apostilleAccount.publicAccount,
                                  this.networkType);
    this.metadataTransactions = transactions;
  }

  public async announce(webSocket?: any) {
    return await this.announceComplete(webSocket);
  }

  public async announceAsync() {
    const transactionHttp = new TransactionHttp(this.apiEndpoint);
    const signedTx = await this.signTransaction();
    this.txHash = signedTx.hash;
    return new Promise<AnnounceResult>((resolve, reject) => {
      transactionHttp.announce(signedTx).subscribe(
        (x) => {
          resolve(this.announceResult(signedTx));
        },
        (err) => {
          reject(err);
        },
      );
    });
  }

  public innerTransactions() {
    const innerTransactions: InnerTransaction[] = [];
    innerTransactions.push(this.coreTransaction!);
    if (this.announcePublicSinkTransaction) {
      innerTransactions.push(this.announcePublicSinkTransaction);
    }
    if (this.assignOwnershipTransaction) {
      innerTransactions.push(this.assignOwnershipTransaction);
    }
    if (this.metadataTransactions) {
      Array.prototype.push.apply(innerTransactions, this.metadataTransactions);
    }
    return innerTransactions;
  }

  public async isNeedApostilleAccountSign() {
    if (this.announcePublicSinkTransaction
      || this.assignOwnershipTransaction
      || this.metadataTransactions) {
      return true;
    }
    return false;
  }

}
