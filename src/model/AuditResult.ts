import { PublicAccount, Address } from 'symbol-sdk';

export class AuditResult {
  constructor(public readonly isSuccess: boolean,
              public readonly txHash?: string,
              public readonly fileHash?: string,
              public readonly ownerPublicAccount?: PublicAccount,
              public readonly apostilleAddress?: Address,
              public readonly timestamp?: number,
              public readonly metadata?: Object,
    ) {}
}
