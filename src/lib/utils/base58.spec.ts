import { Base58 } from './base58';

describe("Utils: Base58 Encoding / Decoding", () => {

    it('should encode', () => {
        let data: number[] = new Array<number>(64).fill(0);
        let encoded = Base58.encode(data);
        expect(encoded).toEqual('1111111111111111111111111111111111111111111111111111111111111111');
    });

    it('should decode and then encode', () => {
        let base58 = '3P93GB88cqtSHAXT9Jec3ePmJabakZNXq9A';
        expect(Base58.encode(Base58.decode(base58))).toEqual(base58);
    });

    it('should validate correctly', () => {
        expect(Base58.isValid('0')).toBeFalsy();
        expect(Base58.isValid('3P93GB88cqtSHAXT9Jec3ePmJabakZNXq9A')).toBeTruthy();
    })
});