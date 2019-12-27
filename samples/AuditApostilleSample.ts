import { AuditService } from '../src/service/AuditService';
import { NetworkType } from 'nem2-sdk';
import * as fs from 'fs';

const url = 'http://ec2-3-136-106-135.us-east-2.compute.amazonaws.com:3000';
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
// const file = fs.readFileSync(`${__dirname}/file/dummy.txt`);
const fileData = file.toString('hex');
const txHash = '7FF422A7FA79AF09ABDFBA99E77C348AACE8067A49894BF45D78293B1BFF53AC';

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
