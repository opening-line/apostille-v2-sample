import { AuditService } from '../src/service/AuditService';
import { NetworkType } from 'nem2-sdk';
import * as fs from 'fs';

const url = 'https://fushicho2-nofee.opening-line.jp:3001';
const file = fs.readFileSync(`${__dirname}/file/90681.jpeg`);
// const file = fs.readFileSync(`${__dirname}/file/dummy.txt`);
const fileData = file.toString('hex');
const txHash = 'B2453A0155906D46BEE0510AEEB6BFD4FAFEF5D03DF7EED004D0967AEB0E6830';

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
  if (result.metadata) {
    console.log('- metadata -');
    Object.keys(result.metadata).forEach((key) => {
      console.log(`${key}: ${result.metadata![key]}`);
    });
  }
}
