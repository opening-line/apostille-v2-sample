import { AuditService } from '../src/service/AuditService';
import { NetworkType } from 'nem2-sdk';

const url = 'http://13.114.200.132:3000';
const auditData = 'aaaaaaaaa';
const txHash = 'D4F928C2A2F9769D45FC60E748E3F753EA91CB01EA6216A89631C7540743D468';

run();

async function run() {
  const result = await AuditService.audit(auditData, txHash, url, NetworkType.MIJIN_TEST);
  console.log('--- audit result ---');
  console.log(`isSuccess: ${result.isSuccess}`);
  console.log(`txHash: ${result.txHash}`);
  console.log(`fileHash: ${result.fileHash}`);
  console.log(`ownerPublicAccount: ${result.ownerPublicAccount!.publicKey}`);
  console.log(`ApostilleAddress: ${result.apostilleAddress!.plain()}`)
  console.log(`timestamp: ${new Date(result.timestamp!)}`);
}
