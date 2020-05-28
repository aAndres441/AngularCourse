import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRecipesPipe'
})
export class FilterRecipesPipe implements PipeTransform {

  transform(value: any, filterInput: string, namedata: string): any {
    const result = [];
    if(value.length === 0 || filterInput === '') {
      return value;
    }
    filterInput = filterInput.toLocaleLowerCase();
    namedata = namedata.toLocaleLowerCase();
    for (const item of value) {
      if (item[namedata] === filterInput) {
        result.push(item);
       }
    }
    return result;
  }

}
