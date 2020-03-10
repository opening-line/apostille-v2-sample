import { NetworkType } from 'symbol-sdk';
import { Sinks } from '../../src/model/Sink';

describe('enum sink should work', () => {
  it('should return correct sink address of MAIN_NET', () => {
    const exceptAddress = 'NA3MA2-B3N2G6-CONOSP-SV2KMK-NWN6AU-Q2OCVX-YRPN';
    const sinkAddress = Sinks.getAddress(NetworkType.MAIN_NET);
    expect(sinkAddress.pretty()).toMatch(exceptAddress);
  });

  it('should return correct sink address of TEST_NET', () => {
    const exceptAddress = 'TA3MA2-B3N2G6-CONOSP-SV2KMK-NWN6AU-Q2OCGI-RWZR';
    const sinkAddress = Sinks.getAddress(NetworkType.TEST_NET);
    expect(sinkAddress.pretty()).toMatch(exceptAddress);
  });

  it('should return correct sink address of MIJIN', () => {
    const exceptAddress = 'MA3MA2-B3N2G6-CONOSP-SV2KMK-NWN6AU-Q2ODRS-F33D';
    const sinkAddress = Sinks.getAddress(NetworkType.MIJIN);
    expect(sinkAddress.pretty()).toMatch(exceptAddress);
  });

  it('should return correct sink address of MIJIN_TEST', () => {
    const exceptAddress = 'SA3MA2-B3N2G6-CONOSP-SV2KMK-NWN6AU-Q2OA6E-2WYJ';
    const sinkAddress = Sinks.getAddress(NetworkType.MIJIN_TEST);
    expect(sinkAddress.pretty()).toMatch(exceptAddress);
  });
});
