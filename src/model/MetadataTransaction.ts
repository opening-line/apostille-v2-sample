import { AccountMetadataTransaction, Deadline,
   PublicAccount, KeyGenerator, NetworkType, InnerTransaction } from 'nem2-sdk';

export class MetadataTransaction {

  constructor(private key: string,
              private value: string,
              private apostilleAccount: PublicAccount,
              private networkType: NetworkType) { }

  public toCreateMetadataTransaction() {
    const metadataTransaction = AccountMetadataTransaction.create(
      Deadline.create(),
      this.apostilleAccount.publicKey,
      KeyGenerator.generateUInt64Key(this.key),
      this.value.length,
      this.value,
      this.networkType,
    );

    const innerTransaction = metadataTransaction.toAggregate(this.apostilleAccount);

    return innerTransaction;
  }

  public static objectToMetadataTransactions(obj: Object,
                                             apostilleAccount: PublicAccount,
                                             networkType: NetworkType) {
    const metadataTransactions: InnerTransaction[] = [];
    Object.entries(obj).forEach(([key, value]) => {
      const metadataTxObj = new MetadataTransaction(key, value,
                                                    apostilleAccount,
                                                    networkType);
      metadataTransactions.push(metadataTxObj.toCreateMetadataTransaction());
    });

    return metadataTransactions;
  }
}
