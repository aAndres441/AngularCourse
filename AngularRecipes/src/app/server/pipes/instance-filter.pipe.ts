import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instanceFilter'
})
export class InstanceFilterPipe implements PipeTransform {

  transform(value: any, filterInput: string, inst: string): any {
    const resultAray = [];
    if (value.lenght === 0 || filterInput === '') {
      return value;
    }
    filterInput = filterInput.toLocaleLowerCase();
    inst = inst.toLocaleLowerCase();
    for (const item of value) {
      if (item.instanceType === filterInput) {
        resultAray.push(item);
      }
    }
    return resultAray;
  }

}
