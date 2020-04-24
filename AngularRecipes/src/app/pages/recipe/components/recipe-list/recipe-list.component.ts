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

  
/* recipes: Recipe[] = [
  new Recipe('Primera', ' Una primera receta ', 'https://t1.kn3.net/taringa/2/4/0/1/B/6/_SoyDelRojo_/176x132_F29.jpg'),
  new Recipe ('Segunda', 'La segunda receta','https://3.bp.blogspot.com/-VpJYuF9BAWc/VzUCMtHgU-I/AAAAAAAALlc/l0G979ipexcs_GaWHzfr4p-2HpJFJtnoQCLcB/s1600/Salchicha%2Bde%2Bcerdo%2B-%2BDerivado%2Bdel%2Bcerdo.jpg'),
  new Recipe('Primera', ' Una primera receta ', 'https://t1.kn3.net/taringa/2/4/0/1/B/6/_SoyDelRojo_/176x132_F29.jpg'),
  new Recipe ('Segunda', 'La segunda receta','https://3.bp.blogspot.com/-VpJYuF9BAWc/VzUCMtHgU-I/AAAAAAAALlc/l0G979ipexcs_GaWHzfr4p-2HpJFJtnoQCLcB/s1600/Salchicha%2Bde%2Bcerdo%2B-%2BDerivado%2Bdel%2Bcerdo.jpg')
]; */

recipes: Recipe[];  // subject
private ingresdUnsuscribe: Subscription;

prueboName1 = '';
prueboName2 = '';
title = '';

@ViewChild('unValor', { static: false }) unValor: ElementRef;


// @Output() otroDetalle = new EventEmitter<Recipe>();

  constructor(private servicioRecipe: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    /* alert(this.recipes.length+  'tt'); */
    //alert(  'HELLO');
    // aca llamo a la copia porque en el servicio tiene slice()
    /* this.recipes = this.servicioRecipe.getRecipesListFilter(); */
    this.recipes = this.servicioRecipe.getRecipesListFilter();
   // alert(this.recipes.length+  'tt');
      /* arriba devuelve lista filtrada desde el sevicio
    this.recipes = this.servicioRecipe.getRecipe(); */

    // y aca veo los cambios en la copia y los guardo, no seria necesario si trabajo sin slice()
   // this.servicioRecipe.recipesChanged
    this.ingresdUnsuscribe = this.servicioRecipe.recipesChanged2
    .subscribe(
      (recips: Recipe []) => {
      this.recipes = recips; }
    );
  }

  ngOnDestroy() {
    this.ingresdUnsuscribe.unsubscribe();
  }

  onNewRecipe(i: number) {
    this.router.navigate(['new'], {relativeTo: this.route});
    // navega a new relativo a que ya estoy parado en recipe
  }

  /* lo saco porque uso servicio , y tambien saco el @Output() otroDetalle*/
  /* otroEventoParaElDetalle(rec: Recipe) {
    this.otroDetalle.emit(rec);     
  }*/

  changeName1() {
    this.prueboName1 = this.unValor.nativeElement.value;   
    confirm('probando ' + this.prueboName1);
    }

  changeName2(event: Event) {
    this.prueboName2 = (event.target as HTMLInputElement).value;
    confirm('prueboName ' + this.prueboName2);
  }

  cambio(value: string){
    confirm(value + ' cambio');
  }

  changeName(value: string){
    confirm(value + ' changeName');
  }

  Toshoppingnow() {
    this.router.navigate(['/shopping'],  // '/shopping', 'list'
      /* {
        queryParams: { ID: 'Pepe' },
        fragment: 'loading' + 'Hello'
      } */
    );
  }
  
}
