import * as blakejs from 'blakejs';

export class Blake2b {
    static hash32(input: Uint8Array): Uint8Array {
        return blakejs.blake2b(input, null, 32);
    }
}