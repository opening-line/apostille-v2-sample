import { AuditService } from '../src/service/AuditService';
import { NetworkType } from 'nem2-sdk';
import * as fs from 'fs';

// const url = 'http://18.217.110.63:3000';
const url = 'http://ec2-18-223-111-125.us-east-2.compute.amazonaws.com:3000';
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
// const file = fs.readFileSync(`${__dirname}/file/dummy.txt`);
const fileData = file.toString('hex');
const txHash = 'E90D9C6628B0687B3F880622F734E8E87451FBEC693AC6AA93AAA61E9686B5B8';

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
