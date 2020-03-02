import { AuditService } from '../src/service/AuditService';
import { NetworkType } from 'nem2-sdk';
import * as fs from 'fs';

const url = 'https://sym-test.opening-line.jp:3001';
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
const fileData = file.toString('hex');
const txHash = 'C22D8163B194E85590C400F9CFC28CE7DC48671D662954E05085B59D2FA860F3';

run();

async function run() {
  const result = await AuditService.audit(fileData, txHash, url, NetworkType.TEST_NET);
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
}
