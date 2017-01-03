import { Blake2b } from './blake2b';
import { toHex } from '../utils/hex';

describe('Blake2b', () => {
    it('should works', () => {
        let input = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
        let hash = Blake2b.hash32(input);
        let str = toHex(hash);
        expect(str).toEqual('ea2d4bc21f5319fc5c97b2266e5023b94396cd2d1af901bacd2be5962a70b4e5');
    });
});