import * as grpc from '@grpc/grpc-js';
import { 
  CatalogueClientImpl
} from './__generated__/proto/proto/catalogue.js';

class GrpcRpc {
  private client: grpc.Client;

  constructor(address: string) {
    this.client = new grpc.Client(address, grpc.credentials.createInsecure());
  }

  async request(service: string, method: string, data: Uint8Array): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      this.client.makeUnaryRequest(
        `/${service}/${method}`,
        (arg: Buffer) => arg,
        (arg: Buffer) => arg,
        Buffer.from(data),
        (error: grpc.ServiceError | null, response?: Buffer) => {
          if (error) {
            reject(error);
          } else if (response) {
            resolve(new Uint8Array(response));
          } else {
            reject(new Error('No response received'));
          }
        }
      );
    });
  }
}

const rpc = new GrpcRpc('localhost:50051');
export const catalogueClient = new CatalogueClientImpl(rpc);
