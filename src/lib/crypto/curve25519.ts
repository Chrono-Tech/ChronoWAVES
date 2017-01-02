import * as axl from 'axlsign';

export class KeyPair {
    constructor(
        public privateKey: Uint8Array, 
        public publicKey: Uint8Array
    ) {}
}

export class Curve25519 {
    static KEY_LENGTH = 32;
    
    static generateKeyPair() : KeyPair {
        let pair = axl.generateKeyPair(new Uint8Array([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]))
        return {
            privateKey: pair.private,
            publicKey: pair.public
        }
    }
}