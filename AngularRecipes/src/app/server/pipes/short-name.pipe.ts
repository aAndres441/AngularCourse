import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acorte',
  pure: false
})
export class ShortNamePipe implements PipeTransform {

  transform(value: any, lilmit: number): any {
    if (value.length > lilmit) {
      return value.substr(0, lilmit) + '...';
    }
    return value;
  }

}
