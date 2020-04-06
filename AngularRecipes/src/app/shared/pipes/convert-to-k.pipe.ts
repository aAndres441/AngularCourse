import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from 'src/app/pages/recipe/recipe.model';

@Pipe({
  name: 'convertToK'
})
export class ConvertToKPipe implements PipeTransform {

  /* transform(value: any, ...args: any[]): any {
    return null;
  } */

  transform(value: string, character: string): string {
    /* value.toLocaleLowerCase(); */
     return value.replace(character, '**');
  }

  /* transform(recipes: Recipe[], dato: string): Recipe[]{
    if (dato.length === 0) { return recipes; }
    dato.toLocaleLowerCase();
    return recipes.filter((rec) => {
      return rec.name.includes(dato);
    }); 
  }*/
      // el filtro recorre recipes y por c/u que tenga el dato lo retorna => al arreglo


}
