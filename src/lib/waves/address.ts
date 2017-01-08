import { NetworkParameters } from './network';
import { Blake2b } from '../crypto/blake2b';
import { Keccak } from '../crypto/keccak';
import { Base58 } from '../utils/base58';
import { Curve25519 } from '../crypto/curve25519';

import secureHash from './hash-chain';

const ADDRESS_VERSION = 1;
const HASH_LENGTH     = 20;
const CHECKSUM_LENGTH = 4;
const ADDRESS_LENGTH  = 1 + 1 + CHECKSUM_LENGTH + HASH_LENGTH;


export class Address {

    /**
     * Build Waves address for particular network
     */
    static create(network: NetworkParameters, publicKey: Uint8Array): string {
        if (publicKey.length !== Curve25519.KEY_LENGTH)
            return '';

        const pubKeyHash = secureHash(publicKey).subarray(0, HASH_LENGTH);
        
        // concat two arrays
        const withoutChecksum = new Uint8Array(2 + HASH_LENGTH);
        withoutChecksum.set(new Uint8Array([ADDRESS_VERSION, network.chainId]), 0);
        withoutChecksum.set(pubKeyHash, 2);

        const checksum = secureHash(withoutChecksum).subarray(0, CHECKSUM_LENGTH);

        // concat two arrays
        const addressBytes = new Uint8Array(withoutChecksum.length + checksum.length);
        addressBytes.set(withoutChecksum, 0);
        addressBytes.set(checksum, withoutChecksum.length);
        return Base58.encode(addressBytes);
    }
}