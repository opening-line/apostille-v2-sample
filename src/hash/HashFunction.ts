import { NetworkType } from 'nem2-sdk';

export abstract class HashFunction {
  constructor(public readonly typeHex: string) { }

  public abstract signedHashing(data: string, signerPrivateKey: string, networkType: NetworkType);

  public checksum = `fe4e5459${this.typeHex}`;
}
