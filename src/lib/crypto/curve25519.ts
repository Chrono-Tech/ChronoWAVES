import * as axl from 'axlsign';

export class KeyPair {
    constructor(
        public privateKey: Uint8Array,
        public publicKey: Uint8Array
    ) {}
}

export class Curve25519 {
    static KEY_LENGTH: number = 32;
    static generateKeyPair(seed: Uint8Array): KeyPair {
        const pair = axl.generateKeyPair(seed);
        return new KeyPair(pair.private, pair.public);
    }

    static verify(publicKey: any, message: any, signature: any): boolean {
        return false;
    }
}