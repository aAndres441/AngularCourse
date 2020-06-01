import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, inputLetter: string, propName: string): any {
    const resultAray = [];
    if (value.lenght === 0 || inputLetter === '') {
      return value;
    }
    inputLetter = inputLetter.toLocaleLowerCase();
    propName = propName.toLocaleLowerCase();
    for (const item of value) {
      if (item.name.charAt(0).toLocaleLowerCase() === inputLetter) {
        resultAray.push(item);
      }
    }
    return resultAray;
  }

}
