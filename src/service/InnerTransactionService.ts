import { GeneralApostilleService } from './GeneralApostilleService';
import { HashFunction } from '../hash/hash';
import { NetworkType } from 'nem2-sdk';
import { ApostilleAccount } from '../model/model';

export class InnerTransactionService extends GeneralApostilleService {

  static dummyEndpoint = 'http://example.com:3000';
  static dummyGenerationHash = '0000000000000000000000000000000000000000000000000000000000000000';

  public static create(data: string,
                       filename: string,
                       hashFunction: HashFunction,
                       ownerPrivateKey: string,
                       networkType: NetworkType,
    ) {
    const service = new InnerTransactionService(data, filename,
                                                hashFunction, ownerPrivateKey,
                                                this.dummyGenerationHash, networkType,
                                                this.dummyGenerationHash);
    return service;
  }

  constructor(data: string,
              filename: string,
              hashFunction: HashFunction,
              ownerPrivateKey: string,
              dummyEndpoint: string,
              networkType: NetworkType,
              dummyGenerationHash: string,
    ) {
    super(data, hashFunction, ownerPrivateKey, dummyEndpoint, networkType, dummyGenerationHash);
    this.apostilleAccount = ApostilleAccount.create(filename, this.ownerAccount);
  }

  public isNeedApostilleAccountSign() {
    if (this.announcePublicSinkTransaction
      || this.assignOwnershipTransaction
      || this.metadataTransactions) {
      return true;
    }
    return false;
  }
}
