import { AuditService } from '../src/service/AuditService';
import { NetworkType } from 'nem2-sdk';
import * as fs from 'fs';

const url = 'http://18.217.110.63:3000';
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
// const file = fs.readFileSync(`${__dirname}/file/dummy.txt`);
const fileData = file.toString('hex');
const txHash = 'FD586B5F6E8B57A6A6E4058C91A38C829072A39FCDFB3678E7C5A7EBFDFAB998';

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
