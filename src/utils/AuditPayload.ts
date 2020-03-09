import { PublicAccount, NetworkType, KeyPair } from 'symbol-sdk';
import { HashFunctionCreator } from '../hash/HashFunctionCreator';
import { HashingType } from '../hash/hash';

const apostillePattern = /fe4e5459(81|82|83|88|89|90|91)(\w+)/;

export class AuditPayload {

  private readonly ownerPublicAccount: PublicAccount;
  private hashingType!: HashingType;
  private signedHash!: string;

  constructor(private readonly data: string,
              private readonly payload: string,
              ownerPublicKey: string,
              networkType: NetworkType) {
    this.ownerPublicAccount = PublicAccount.createFromPublicKey(ownerPublicKey, networkType);
  }

  private parsePayload() {
    const match = this.payload.match(apostillePattern);
    if (match) {
      this.hashingType = HashingType.hashTypeStrToType(match[1]);
      this.signedHash = match[2];
    } else {
      throw Error('not apostille payload');
    }
  }

  private auditMessage() {
    try {
      this.parsePayload();
      const hashingFunction = HashFunctionCreator.create(this.hashingType!);
      const dataHash = hashingFunction.hashing(this.data);
      const bufDataHash = new TextEncoder().encode(dataHash);
      const bufSignedHash = Uint8Array.from(Buffer.from(this.signedHash!, 'hex'));
      const pubKey = Uint8Array.from(Buffer.from(this.ownerPublicAccount.publicKey, 'hex'));
      const isValid = KeyPair.verify(pubKey, bufDataHash, bufSignedHash);
      return isValid;
    } catch (err) {
      throw err;
    }
  }

  public audit() {
    try {
      this.parsePayload();
      return this.auditMessage();
    } catch {
      return false;
    }
  }

  public static audit(data: string,
                      txPayload: string,
                      ownerPublicKey: string,
                      networkType: NetworkType) {
    const auditObj = new AuditPayload(data, txPayload, ownerPublicKey, networkType);
    return auditObj.audit();
  }
}
