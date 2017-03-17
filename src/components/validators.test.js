import {numberValidator, positive, addressValidator, decimalsValidator} from './validators';
import Waves from 'waves.js/dist/waves';

describe('validators', () => {
  it('should validate numbers', () => {
    expect(numberValidator("1")).toBeUndefined();
    expect(numberValidator("1.1")).toBeUndefined();
    expect(numberValidator("+1.1")).toBeUndefined();
    expect(numberValidator("-1.1")).toBeUndefined();

    expect(numberValidator("a1")).toBeDefined();
    expect(numberValidator("1.1.1")).toBeDefined();
    expect(numberValidator("+-1.1")).toBeDefined();
  });

  it('should validate addresses', () => {
    const mainnet = new Waves(Waves.MainNetParameters());
    const testnet = new Waves(Waves.TestNetParameters());

    const testnetValidator = addressValidator(testnet);
    const mainnetValidator = addressValidator(mainnet);

    expect(testnetValidator('3MsKhZJzGZ1hnZJZUPYUAKjGQdk7Q7qoCRa')).toBeUndefined();
    expect(testnetValidator('3P7AQh2UmTuKbqcC2yjmhFeLb27bP6wBKNV')).toBeDefined();

    expect(mainnetValidator('3MsKhZJzGZ1hnZJZUPYUAKjGQdk7Q7qoCRa')).toBeDefined();
    expect(mainnetValidator('3P7AQh2UmTuKbqcC2yjmhFeLb27bP6wBKNV')).toBeUndefined();
  });

  it('should validate positive', () => {
    expect(positive('-1')).toBeDefined();
    expect(positive('1')).toBeUndefined();
    expect(positive('+1')).toBeUndefined();
    expect(positive('+a')).toBeUndefined();
    expect(positive('a')).toBeUndefined();
  });

  it('should validate decimals', () => {

    expect(decimalsValidator(2)('1')).toBeUndefined();
    expect(decimalsValidator(2)('1.11')).toBeUndefined();
    expect(decimalsValidator(2)('1.1')).toBeUndefined();
    expect(decimalsValidator(2)('1.111')).toBeDefined();

    expect(decimalsValidator(0)('1')).toBeUndefined();
    expect(decimalsValidator(0)('1.11')).toBeDefined();
    expect(decimalsValidator(0)('1.1')).toBeDefined();
    expect(decimalsValidator(0)('1.')).toBeDefined();

    expect(decimalsValidator(8)('1')).toBeUndefined();
    expect(decimalsValidator(8)('1.123456789')).toBeDefined();
    expect(decimalsValidator(8)('1.12345678')).toBeUndefined();
  });
});
