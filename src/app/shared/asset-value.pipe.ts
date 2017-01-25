import { Pipe, PipeTransform } from '@angular/core';

import { CurrencyFormatter } from '../../lib/utils/currency-formatter';

@Pipe({
  name: 'assetValue'
})
export class AssetValuePipe implements PipeTransform {

  transform(input: number, digits?: number): string {
    return CurrencyFormatter.toString(input, digits);
  }

}
