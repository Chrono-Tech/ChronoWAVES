import sha256 from 'fast-sha256';
import { NetworkParameters } from './network';
import secureHash from './hash-chain';
import { Curve25519 } from '../crypto/curve25519';
import { Address } from './address';

function str2bytes(str: string): Uint8Array {
    str = decodeURI(encodeURIComponent(str));
    let bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i)
        bytes[i] = str.charCodeAt(i);
    return bytes;
};

export class Account {

    constructor(public address: string) { }

    /**
     * Create new waves account from seed
     */
    static create(network: NetworkParameters, seed: string): Account {

        // 0. seed to bytes array
        const seedBytes = str2bytes(seed);

        // 1. accSeed = nonce + seedBytes
        const accSeed = new Uint8Array(4 + seedBytes.length);
        accSeed.set(new Uint8Array([0, 0, 0, 0]), 0);
        accSeed.set(seedBytes, 4);

        // 2. seedHash = hashChain(accSeed)
        const seedHash = secureHash(accSeed);

        // 3. accSeedHash = sha256(seedHash)
        const accountSeedHash = sha256(seedHash);

        // 4. create keys
        const keys = Curve25519.generateKeyPair(accountSeedHash);

        const address = Address.create(network, keys.publicKey);
        
        return new Account(address);
    }

}