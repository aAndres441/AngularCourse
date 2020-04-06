import { EventEmitter } from '@angular/core';
import {Subject} from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';


export class ShoppingService {

  ingredientsChange = new EventEmitter<Ingredient[]>(); // ya no va, sera subject
  
  ingredientsChange2 = new Subject<Ingredient[]>();

  errorToAdd = new EventEmitter<string>();

  constructor() { }

  private ingredients: Ingredient[] = [
    new Ingredient('Green apple', 22),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Potatoes', 2),
    new Ingredient('Onions', 5)
  ];

  getIngredients(): Ingredient[] {
    if (this.ingredients.length > 0) {
      return this.ingredients.slice(); /* Devuelve copia*/
    }
    return null;
  }

  addIngredient(oneIngredient: Ingredient) {

      this.ingredients.push(oneIngredient);
      /*/ informamos a otros componentes del cambio en la copia de la matriz,
      pero lo cambie por subject */
      // this.ingredientsChange.emit(this.ingredients.slice());

      /*uso subjects en lugar de emitter */
      this.ingredientsChange2.next(this.ingredients.slice());
  }

   addIngredients(ingreds: Ingredient[]) {
   /* for (const ing of ingreds) {
      this.addIngredient(ing);
    } 
    No usamos este metodo para no emitir por cada ing, usaremos el de abajo.
    Usando ... agrega lista de ingredientes a la matriz que guarda estas listas*/

    this.ingredients.push(...ingreds);
    
    // this.ingredientsChange.emit(this.ingredients.slice());
    // /*uso subjects en lugar de emitter */
    this.ingredientsChange.next(this.ingredients.slice());

    alert('SUCCESS !! all the ingredients were added from shopping service.');

  }
}
