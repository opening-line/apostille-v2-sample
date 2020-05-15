import { AuditService } from '../src/service/AuditService';
import { NetworkType } from 'symbol-sdk';
import * as fs from 'fs';

const url = 'https://sym-test.opening-line.jp:3001';
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const txHash = '2A92C5E80F0A5454C8357E9201733D22C7FC8CE8F6A8B3363AF5D0854528E04E';

AuditService.audit(fileData, txHash, url, NetworkType.TEST_NET).then((result) => {
  console.log('--- audit result ---');
  console.log(`isSuccess: ${result.isSuccess}`);
  console.log(`txHash: ${result.txHash}`);
  console.log(`fileHash: ${result.fileHash}`);
  console.log(`ownerPublicAccount: ${result.ownerPublicAccount!.publicKey}`);
  console.log(`ApostilleAddress: ${result.apostilleAddress!.plain()}`);
  console.log(`timestamp: ${new Date(result.timestamp!)}`);
  if (result.metadata) {
    console.log('- metadata -');
    Object.keys(result.metadata).forEach((key) => {
      console.log(`${key}: ${result.metadata![key]}`);
    });
  }
}).catch((err) => {
  console.error(err);
});
