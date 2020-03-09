import { NetworkType } from 'symbol-sdk';
import { Sinks } from '../../src/model/Sink';

describe('enum sink should work', () => {
  it('should return correct sink address of MAIN_NET', () => {
    const exceptAddress = 'NCZSJHLTIMESERVBVKOW6US64YDZG2PFGQCSV23J';
    const sinkAddress = Sinks.getAddress(NetworkType.MAIN_NET);
    expect(sinkAddress.plain()).toMatch(exceptAddress);
  });

  it('should return correct sink address of TEST_NET', () => {
    const exceptAddress = 'TC7MCY5AGJQXZQ4BN3BOPNXUVIGDJCOHBPGUM2GE';
    const sinkAddress = Sinks.getAddress(NetworkType.TEST_NET);
    expect(sinkAddress.plain()).toMatch(exceptAddress);
  });

  it('should return correct sink address of MIJIN', () => {
    const exceptAddress = 'MCGDK2J46BODGGKMPIKCBGTBBIWL6AL5ZKLKQ56A';
    const sinkAddress = Sinks.getAddress(NetworkType.MIJIN);
    expect(sinkAddress.plain()).toMatch(exceptAddress);
  });

  it('should return correct sink address of MIJIN_TEST', () => {
    const exceptAddress = 'SCGWG66Z5DWYKQNB6M4UITN4NP4GGUWKMCG5U6ZT';
    const sinkAddress = Sinks.getAddress(NetworkType.MIJIN_TEST);
    expect(sinkAddress.plain()).toMatch(exceptAddress);
  });
});
