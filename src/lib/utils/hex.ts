export function toHex (bytes: any) {
  return Array.prototype.map.call(bytes, function (n: any) {
    return (n < 16 ? '0' : '') + n.toString(16);
  }).join('');
}