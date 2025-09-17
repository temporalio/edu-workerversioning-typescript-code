import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';
import { TaskQueueName } from './shared';

async function run() {
  const connection = await NativeConnection.connect({ address: 'localhost:7233' });
  const worker = await Worker.create({
    taskQueue: TaskQueueName,
    connection,
    workflowsPath: require.resolve('./workflows'),
    activities,
    workerDeploymentOptions: {
      useWorkerVersioning: true,
      // TODO Part A: Assign a Build ID and a default versioning behavior of PINNED
      version: { buildId: '', deploymentName: 'worker_versioning_demo' },
      defaultVersioningBehavior: 'UNSPECIFIED',
    },
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
