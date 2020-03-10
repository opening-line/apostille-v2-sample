import { AuditService } from '../src/service/AuditService';
import { NetworkType } from 'symbol-sdk';
import * as fs from 'fs';

const url = 'https://sym-test.opening-line.jp:3001';
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const txHash = '65197B0ABDD1BBCF9F7A72335E56DD9043C024CEC1DC48211A0500DB38D86ABA';

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
