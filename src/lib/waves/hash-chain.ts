import { Blake2b } from '../crypto/blake2b';
import { Keccak } from '../crypto/keccak';


export default function secureHash(input: Uint8Array): Uint8Array {
    return Keccak.hash32(Blake2b.hash32(input));
}