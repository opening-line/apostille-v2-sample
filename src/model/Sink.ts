import { NetworkType, Address } from 'symbol-sdk';

export enum Sinks {
  // There are temporary address
  // seed public key is 1104EBC76DEE6276A211DDA8CF1F1A0BA625D9F5F54704A54743DEDC85CE6181
  MAIN_NET = 'NA3MA2-B3N2G6-CONOSP-SV2KMK-NWN6AU-Q2OCVX-YRPN',
  TEST_NET = 'TA3MA2-B3N2G6-CONOSP-SV2KMK-NWN6AU-Q2OCGI-RWZR',
  MIJIN = 'MA3MA2-B3N2G6-CONOSP-SV2KMK-NWN6AU-Q2ODRS-F33D',

  MIJIN_TEST = 'SA3MA2-B3N2G6-CONOSP-SV2KMK-NWN6AU-Q2OA6E-2WYJ',
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
