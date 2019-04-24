import { AuditService } from '../src/service/AuditService';
import { NetworkType } from 'nem2-sdk';
import * as fs from 'fs';

const url = 'http://18.217.110.63:3000';
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
// const file = fs.readFileSync(`${__dirname}/file/dummy.txt`);
const fileData = file.toString('hex');
const txHash = '2D7D927158F9EB6AC99EE930975199B0E82B13966376CD4D039D3F2800AAD399';

run();

async function run() {
  const result = await AuditService.audit(fileData, txHash, url, NetworkType.MIJIN_TEST);
  console.log('--- audit result ---');
  console.log(`isSuccess: ${result.isSuccess}`);
  console.log(`txHash: ${result.txHash}`);
  console.log(`fileHash: ${result.fileHash}`);
  console.log(`ownerPublicAccount: ${result.ownerPublicAccount!.publicKey}`);
  console.log(`ApostilleAddress: ${result.apostilleAddress!.plain()}`);
  console.log(`timestamp: ${new Date(result.timestamp!)}`);
  console.log(`metadata: ${result.metadata}`);
}
