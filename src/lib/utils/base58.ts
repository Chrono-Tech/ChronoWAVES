import * as baseX from 'base-x';

/**
 * Base58 Encoding / Decoding utility class
 */
export class Base58 {
    private static converter: baseX.BaseConverter = baseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
    private static regex = new RegExp('^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{0,}$');

    static encode(buffer: baseX.EncodeBuffer): string {
        return this.converter.encode(buffer);
    }
    
    static decode(string: string): baseX.EncodeBuffer {
        return this.converter.decode(string);
    }

    static isValid(string: string): boolean {
        return this.regex.test(string);
    }
}