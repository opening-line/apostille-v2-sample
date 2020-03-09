import { PublicAccount } from 'symbol-sdk';
import { ApostilleAccount } from './ApostilleAccount';

export class AnnounceResult {
  constructor(public readonly txHash: string,
              public readonly fileHash: string,
              public readonly ownerPublicAccount: PublicAccount,
              public readonly apostilleAccount: ApostilleAccount) {}
}
