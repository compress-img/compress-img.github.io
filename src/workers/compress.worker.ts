import { processCompressionJob } from '../lib/compression-engine';
import type { WorkerRequest } from '../lib/compression-types';

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const response = await processCompressionJob(event.data);
  if (response.ok) {
    self.postMessage(response, { transfer: [response.compressedBuffer] });
  } else {
    self.postMessage(response);
  }
};
