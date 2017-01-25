import { CurrencyFormatter } from './currency-formatter';

describe("Utils: CurrecyForamatter", () => {

    it('shoud convert units', () => {
        expect(CurrencyFormatter.toString(1, 0)).toEqual("1");
        expect(CurrencyFormatter.toString(1, 1)).toEqual("0.1");
        expect(CurrencyFormatter.toString(1234, 2)).toEqual("12.34");
        expect(CurrencyFormatter.toString(1)).toEqual("0.00000001");
    });
});