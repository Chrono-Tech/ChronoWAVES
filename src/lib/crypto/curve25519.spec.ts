import { Curve25519, KeyPair } from './curve25519';

describe("Curve25519", () => {

    it('should generate keys', () => {
        let seed = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
        let keys = Curve25519.generateKeyPair(seed);

        expect(keys.publicKey.length).toEqual(Curve25519.KEY_LENGTH);
        expect(keys.privateKey.length).toEqual(Curve25519.KEY_LENGTH);
    });
});