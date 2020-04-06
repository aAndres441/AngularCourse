import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data, Params } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  dato: string;
  allowEdit: string;
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: RecipeService) { }

  ngOnInit() {
    // tslint:disable-next-line: deprecation
   /*  this.route.data. subscribe(
      (dato: Data) => {
        this.dato = dato.servResolve;
      }); */

    // tslint:disable-next-line: deprecation
    /* this.route.queryParams.subscribe(
      (queryPa: Params) => {
        this.allowEdit = queryPa.id;
      }
        );
 */
    /* this.route.fragment.subscribe();
     */
    /* const numero = +this.route.snapshot.params.id;
    this.recipe = this.service.getOneRecipe(numero); */

  }

}
