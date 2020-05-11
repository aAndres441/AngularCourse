import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

recipes: Recipe[];  // subject
private ingresdUnsuscribe: Subscription;

prueboName1 = '';
title = 'List Recipes';
// @Output() otroDetalle = new EventEmitter<Recipe>();

  constructor(private servicioRecipe: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // aca llamo a la copia porque en el servicio tiene slice(),no seria necesario si trabajo sin slice()
    /* this.recipes = this.servicioRecipe.getRecipesListFilter(); */
    // this.recipes = this.servicioRecipe.getRecipes();
      /* arriba devuelve lista filtrada desde el sevicio
    this.recipes = this.servicioRecipe.getRecipes(); */

    this.ingresdUnsuscribe = this.servicioRecipe.recipesChanged
    .subscribe(
      (recips: Recipe []) => {
      this.recipes = recips; 
      }
    );
    this.recipes = this.servicioRecipe.getRecipes();
  }

  ngOnDestroy() {
    this.ingresdUnsuscribe.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
    // navega a new relativo a que ya estoy parado en recipe
  }

  /* lo saco porque uso servicio , y tambien saco el @Output() otroDetalle*/
  /* otroEventoParaElDetalle(rec: Recipe) {
    this.otroDetalle.emit(rec);     
  }*/

  changeName(value: string){
    this.title = value;
  }

  onDeleteAllRecipes(){
    this.servicioRecipe.deleteAllRecipes();
    this.onCancel();
  }

  Toshoppingnow() {
    this.router.navigate(['/shopping'],  // '/shopping', 'list'
      /* {
        queryParams: { ID: 'Pepe' },
        fragment: 'loading' + 'Hello'
      } */
    );
  }

  onCancel() {
    // this.fgNew.reset();
    this.router.navigate(['/recipes']);
  }
  
}
