import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterPipe',
  pure: false
 /* es prop de la pipe para actualizar al filtrar, come recurso,    
  la pongo solo si quiero. tenga en cuenta que el siguiente cambio se asegurará de 
  que cada vez que cambiemos los datos en la página, nuestra tubería se vuelva a calcular, 
  provocando problemas de rendmiento, la tubería ahora se recalcula cada vez que los datos cambian
  */
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
