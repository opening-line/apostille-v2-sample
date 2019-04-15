import { PublicAccount, Account } from "nem2-sdk";

export class AnnounceResult {
  constructor(public readonly txHash: string,
              public readonly fileHash: string,
              public readonly ownerPublicAccount: PublicAccount,
              public readonly apostilleAccount: Account) {}
}
