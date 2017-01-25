import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assetValue'
})
export class AssetValuePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
