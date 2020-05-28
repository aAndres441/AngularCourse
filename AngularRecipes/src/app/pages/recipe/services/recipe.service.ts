import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';
import { ShoppingService } from '../../shopping/services/shopping.service';
import { Subject } from 'rxjs';

 /*  obtenemos los ingred de esta receta, que luego pasaremos con otro servicio
     Injectable a lista compras desde constr. */
@Injectable({
  providedIn: 'root'
})

export class RecipeService {  

  // recipeSelected = new EventEmitter<Recipe>(); // ya no va, sera subject, es usado en datail
 
  recipesChanged = new Subject<Recipe[]>();

  recipeSelectSub = new Subject<Recipe>();
  recipeSelectSub2 = new Subject<Recipe>();

  recipesListFilter: Recipe[];
  valueToFilter: string;

  private recipes: Recipe[] = [
    new Recipe(
      /* 1, */
      'Hamburger',
       ' Your favorite ',
        'https://tse3.mm.bing.net/th?id=OIP.EGdTtAxNa5-tdD2sRmwXSAHaE5&pid=Api&P=0&w=253&h=168',
        [
          new Ingredient('Bread', 2),
          new Ingredient('Meat', 1),
          new Ingredient('Cheese', 100),
          new Ingredient ('Fench fries', 10),
          new Ingredient ('Lettuce', 1)
        ],
         5,
        ),
    new Recipe (
     /*  2, */
      'Salad',
       'Very fresh',
       // tslint:disable-next-line: max-line-length
       'https://tse4.mm.bing.net/th?id=OIP.vUqG9d41U3DvSUrErPAb4QHaFj&pid=Api&P=0&w=216&h=163',
       [
        new Ingredient('onion', 2),
        new Ingredient('tomatoes', 3),
        new Ingredient('mustard', 20)
      ],
      3
      ),
    new Recipe(
      /* 3, */
      'Stew',
       ' Not only winter ',
        'https://i.ytimg.com/vi/qZoG3St1HAc/maxresdefault.jpg',
        [
          new Ingredient('lentil', 200),
          new Ingredient('corn', 13),
          new Ingredient('carrot', 4)
        ],
        2
        ),
    new Recipe (
      /* 4, */
      'Sauce',
       'Only organic food',
       // tslint:disable-next-line: max-line-length
       'http://4.bp.blogspot.com/--W82fPBsOU4/UGjFmXJh2XI/AAAAAAAAAVI/Sxr8rGuHwJY/s640/PS.png',
       [
        new Ingredient('potatoes', 2),
        new Ingredient('strawberry', 15),
        new Ingredient('Lettuce', 4)
      ],
      1
      )
  ];

  constructor(private shopLstService: ShoppingService) {

    this.valueToFilter = 'Salad';
    // this.setRecipesListFilter(this.valueToFilter);
    // alert('constructor' + this.recipesListFilter.length)
   }

  getRecipes(): Recipe[] {
    return this.recipes.slice();  // devuelve una copia de la matriz
  }

  addIngredientsToShoppingList(ingres: Ingredient[]) {
    this.shopLstService.addIngredients(ingres);
  }

  getOneRecipe(id: number): Recipe {
    /* const recipe = this.recipes.find(
      (s) => {
        return s.id === id;
      }
    );
    return recipe; */
    return this.recipes.slice()[id];
  }

  getRecipesListFilter(): Recipe[] {
  return  this.recipesListFilter = this.recipes.slice();
   // alert(this.recipesListFilter.length+'-'+this.recipes.slice().length)
  }

  setRecipesListFilter(data: string): void {
    this.valueToFilter = data;
    this.recipesListFilter = this.recipes ? this.myFilterRecip(this.valueToFilter) : this.recipes;
    /* Que dice: si hay filtro aplícalo, si no devuelve todas las recetas. */
  }
  myFilterRecip(filterBy: string): Recipe[] {
    filterBy = filterBy.toLocaleLowerCase();
    // throw new Error('Method not implemented.');
    return this.recipes.filter((rec: Recipe) => {
      // tslint:disable-next-line: no-unused-expression
      rec.name.toLocaleLowerCase().indexOf(filterBy) !== -1;
    });
    /* Donde primero se toma el filtro y se pasa a minúsculas;
     luego se retorna todo receta cuyo nombre pasado a min contenga lo escrito en el filtro. */
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    // alert('UPDATE ' + newRecipe.rating);
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice()); // this.recipes.slice() || this.getRecipes()
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push (newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1); // elimino y abajo llamo a las actulizadas
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteAllRecipes(){
    while (this.recipes.length) {
      this.recipes.splice(0, 1);
    }    
    this.recipesChanged.next(this.recipes.slice());
  }
}
