import { NetworkType, Address } from 'symbol-sdk';

export enum Sinks {
  MAIN_NET = 'NCZSJHLTIMESERVBVKOW6US64YDZG2PFGQCSV23J',
  TEST_NET = 'TC7MCY5AGJQXZQ4BN3BOPNXUVIGDJCOHBPGUM2GE',
  MIJIN = 'MCGDK2J46BODGGKMPIKCBGTBBIWL6AL5ZKLKQ56A',
  // SAMPLE ONLY!! DO NOT USE PRODUCTION
  MIJIN_TEST = 'SCGWG66Z5DWYKQNB6M4UITN4NP4GGUWKMCG5U6ZT',
}

export namespace Sinks {
  export function getAddress(networkType: NetworkType) {
    switch (networkType) {
    case NetworkType.MAIN_NET: return Address.createFromRawAddress(Sinks.MAIN_NET);
    case NetworkType.TEST_NET: return Address.createFromRawAddress(Sinks.TEST_NET);
    case NetworkType.MIJIN: return Address.createFromRawAddress(Sinks.MIJIN);
    case NetworkType.MIJIN_TEST: return Address.createFromRawAddress(Sinks.MIJIN_TEST);
    }
  }
}
