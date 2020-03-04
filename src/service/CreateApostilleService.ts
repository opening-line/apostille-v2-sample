import { ApostilleAccount } from '../model/ApostilleAccount';
import { NetworkType, TransactionHttp } from 'nem2-sdk';
import { HashFunction } from '../hash/hash';
import { AnnounceResult } from '../model/AnnounceResult';
import { GeneralApostilleService } from './GeneralApostilleService';

export class CreateApostilleService extends GeneralApostilleService {

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
    service.createCoreTransaction();
    return service;
  }

  constructor(data: string,
              filename: string,
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

  public isNeedApostilleAccountSign() {
    if (this.announcePublicSinkTransaction
      || this.assignOwnershipTransaction
      || this.metadataTransactions) {
      return true;
    }
    return false;
  }
}
