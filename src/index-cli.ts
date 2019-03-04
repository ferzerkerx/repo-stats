import { AppFactory } from './AppFactory';
import { CollectorConfig } from './metrics';

async function main(config: any): Promise<void> {
  const collectorConfig: CollectorConfig = await AppFactory.collectorConfiguration(
    config
  );
  const metricsService = AppFactory.metricsService();
  await metricsService.start(collectorConfig);
}

function printUsage() {
  console.log(`Usage: node index.js your-repo-org your-repo-name`);
}

if (process.argv.length < 3) {
  printUsage();
  throw Error('No repo url specified:');
}
const orgName = process.argv[2];
const repositoryName = process.argv[3];
main({ orgName, repositoryName }).then(() => console.log('Finished!'));
