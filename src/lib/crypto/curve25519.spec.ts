import { Curve25519, KeyPair } from './curve25519';

describe("Curve25519", () => {

    it('should generate keys', () => {
        let keys = Curve25519.generateKeyPair();

        expect(keys.publicKey.length).toEqual(Curve25519.KEY_LENGTH);
        expect(keys.privateKey.length).toEqual(Curve25519.KEY_LENGTH);
    })
});