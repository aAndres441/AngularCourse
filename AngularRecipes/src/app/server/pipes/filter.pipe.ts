import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterPipe',
  pure: false  // es prop de la pipe para acr¡tualizar al filtrar, come recurso, la pongo solo si quiero
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterInput: string, stat: string): any {
    const resultAray = [];
    if (value.lenght === 0 || filterInput === '') {
      return value;
    }
    filterInput = filterInput.toLocaleLowerCase();
    stat = stat.toLocaleLowerCase();
    for (const item of value) {
      if (item[stat] === filterInput) {
        resultAray.push(item);
      }
    }
    return resultAray;
   /*  value.filter((ser) => {
      if (ser.stat.include(filterInput)){
        resultAray.push(ser);
        return resultAray;
      }
    }); */
    
  }


}
