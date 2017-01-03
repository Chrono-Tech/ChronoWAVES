import { Keccak } from './keccak';
import { toHex } from '../utils/hex';

describe('Keccak256', () => {
    it('should works', () => {
        let input = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
        let hash = Keccak.hash32(input);
        let str = toHex(hash);
        expect(str).toEqual('fec062278915ba5c3c3af6ebf470b5afc94fedadf39fe78eea427b9aa5df9692');
    });
});