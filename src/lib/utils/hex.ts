
/**
 * Convert array of bytes to string
 */
export function toHex (bytes: Uint8Array): string {
  return Array.prototype.map.call(bytes, function (n: any) {
    return (n < 16 ? '0' : '') + n.toString(16);
  }).join('');
}