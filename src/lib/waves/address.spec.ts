import { Address } from './address';
import { Base58 } from '../utils/base58';
import * as networks from './network';

describe("Address", () => {
    
    it('should generate correct address for testnet', () => {
        const pubKey = 'G9rStAuSaNjMi9KZNVfHymhCUeaWLFqAy88VtTAJre3q';
        const pubKeyBytes = new Uint8Array(Base58.decode(pubKey));

        const testnet = new networks.TestNet();
        const address = Address.create(testnet, pubKeyBytes);
        expect(address).toEqual('3MsKhZJzGZ1hnZJZUPYUAKjGQdk7Q7qoCRa');
    });
});