//import * as decimaljs from 'decimal.js';

export class CurrencyFormatter {
  static defaultDigits: number = 8;

  /**
   * Convert units into currency value with trimmed zeros
   */
  public static toString(units: number, digits?: number): string {
    if (digits === undefined || digits === null)
      digits = CurrencyFormatter.defaultDigits;

    if (units == null || units === undefined)
      return null;

    let decimalValue = new Decimal(units);
    let value = decimalValue.dividedBy(Math.pow(10, digits));
    let integerPart = value.trunc();
    let fractionalPart = value.minus(integerPart);
    let fractionalPartStr = fractionalPart.toFixed(digits).substring(2);
    let integerPartWithCommas = integerPart.toNumber().toLocaleString("en-US", {minimumFractionDigits: 0});
    if (digits == 0) {
      return integerPartWithCommas;
    } else {
      return `${integerPartWithCommas}.${CurrencyFormatter.trimZeros(fractionalPartStr)}`;
    }
  }

  private static trimZeros(str: string): string {
    if (str.length == 0 || str[str.length - 1] != "0")
      return str;
    return CurrencyFormatter.trimZeros(str.substring(0, str.length - 1))
  }
}

