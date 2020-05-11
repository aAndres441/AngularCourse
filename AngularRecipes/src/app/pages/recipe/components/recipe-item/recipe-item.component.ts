import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnDestroy {

  
  @Input() recipe: Recipe;
  @Input() index: number;
  // @Output() detail = new EventEmitter<void>();

// usado para Subject
 recipe2: Recipe;
 private recipSubjectInvento: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: RecipeService) { }

  ngOnInit() {
   
    /* confirm('INDEX ' + this.index.toString());
 */
   /*  const unaid = +this.route.snapshot.params.id;
    this.recipe = this.serviceRecipe.getOneRecipe(unaid);

    this.route.params.subscribe(
      (param: Params) => {
        this.recipe = this.serviceRecipe.getOneRecipe(+param.id);
      }
    ); */
    this.InventoSubject();
    /*con esto le paso la receta por subscription del servicio, es solo mi prueba pues lo paso por parametro, anda igual*/
  }

   /* Ahora con SERVICIO
  ya no emito mas, lo cambio y elimino el @Output() detail.
  Voy a llamar a metodos del servicio, asi que tambien elimino del html component los oyentes
  del html list en item , (detail)="otroEventoParaElDetalle(rec)" */

 /* addDetail() {
    this.detail.emit();
  } */

  /* el metodo de abajo ya no lo uso, pues paso recipe a detalle por param  desde html*/
/*   addDetail(num: number) {
    confirm('A la pelotita' + num + `index ` + this.index);
    this.router.navigate(['/recipes', num],
      
      {
        queryParams: { ID: num },
        fragment: 'loading' + this.recipe.name
      }
    );
} */
    /* 
  Llama al metodo del servicio y emite la receta seleccionada en html (click)="addDetail()"
     this.serviceRecipe.recipeSelected.emit(this.recipe);
     Tambien elimino este servicio pues paso datos dinamicamente por URL    */
    /* start
          {relativeTo: this.route, queryParamsHandling: 'preserve'});
         */

  InventoSubject() {
    this.recipSubjectInvento = this.service.recipeSelectSub
      .subscribe(
        (rec: Recipe) => {
          this.recipe2 = rec;
        }
      );
      
    this.recipe2 = this.service.getOneRecipe(this.index);

    // this.service.recipeSelectSub.next(this.recipe2); /* esto es para avisar al servicio*/
  }

  ngOnDestroy() {
    this.recipSubjectInvento.unsubscribe();
  }

}
