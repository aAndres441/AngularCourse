import { EventEmitter } from '@angular/core';
import {Subject} from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';


export class ShoppingService {

  ingredientsChange = new EventEmitter<Ingredient[]>(); // ya no va, sera subject
  
  ingredientsChange2 = new Subject<Ingredient[]>();
  startIngredEdit = new Subject<number>(); // para editar con el id desde la lista y lo escucha edit

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

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
    /* let res: Ingredient =  null;
    this.ingredients.forEach(element => {
      if (element.id === index) {
        res = element;
      }      
    });
    alert( res.name + ' the name ');
    return res; */


/* return this.ingredients.find(index);*/
    /* return res; */ 

    /* .subscribe(
      (ings: Ingredient[]) => {
        this.misIngredientes = ings;
      }
    ); */
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
    this.ingredientsChange2.next(this.ingredients.slice());
    // o sera este? this.ingredientsChange2.next(this.ingredients.slice());

    alert('SUCCESS !! all the ingredients were added from shopping service.');

  }

  updateIngredient(index: number, newIng: Ingredient): void {
    this.ingredients[index] = newIng;
    this.ingredientsChange2.next(this.ingredients.slice()); // mando a los ingred modificados y los muestro

/* if (this.ingredients[index] !== null) {
  alert('yes');
}else{alert('no');} */
  }

  deleteIngred(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChange2.next(this.ingredients.slice());
  }

 
}
