import { AuditService } from '../src/service/AuditService';
import { NetworkType } from 'nem2-sdk';

const url = 'http://18.217.110.63:3000';
const auditData = 'aaaaaaaaa';
const txHash = '5C1FD481BAEE45355E6B182C35F2509EE0A973FD7073CA3ACE7F0F54C8BC5460';
// const txHash = 'A4F5BF70F97ED7A6CF1A4AD86940394F2468D1B7388DAEE276E3215500A39BAD';

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
  console.log(`metadata: ${result.metadata}`);
}
