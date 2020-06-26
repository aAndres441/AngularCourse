import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
// import { RecipeService } from '../../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],

  // aca el servicio de recetas, que lo debemos de poner en modulo mas general
  // providers: [RecipeService]
})
export class RecipeComponent implements OnInit {

  recipeWasSelected: Recipe; // sera la cargada en el oninit con el subscibe desde el emit del servicio  
  title: string;
  valueRandom: boolean;
  mumberRandom: number;

  constructor(
              private router: Router,
              private route: ActivatedRoute) {
  }
  
  ngOnInit() {
    /*aca escucho el evento que emite que seleccciono una receta para el detalle
    e informa de cualquier cambio;
    pero ahora aca ya no lo etoy usando
    lo DE ABAJO NO LO ESTOY USANDO*/
    
  /*   this.servicioRecipe.recipeSelected
    .subscribe(
      (oneRecipe: Recipe) => {
        this.recipeWasSelected = oneRecipe;
      }    
    ); */

    /* aca el oyente del evento, en la receta seleccionada me suscribo
    e informar cambios emitidos por el item-component el dato y digo que recibo una receta v del tipo
    receta, con el cuerpo asignando a mi properti con lo recibido en el suscribe oneRecipe
*/

    this.title = 'RECIPES EASY';
  }

  /* la ruta a navegar toma como referencia a una relativa como base */
  reload() {
     this.router.navigate(['home'], {
       /* relativeTo: this.route, */
       queryParams: { ID: '1973' },
        fragment: 'Mal'
      });

       /* this.router.navigate(['edit'], {
         relativeTo: this.route,
        queryParamsHandling: 'preserve'}*/
  }
  
  
 /*  onNotify(message: string): void {
    confirm(message);
    this.title = message;
  } */

  onLoadServer() {
    this.valueRandom = (Math.floor(Math.random() * 256) % 2 === 0 ? true : false);  //  Math.random();
    this.mumberRandom = (Math.log10(Math.random()) * 1);
    confirm('Random of server is ' + this.valueRandom + ' number ' + this.mumberRandom);
    
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
    // navega a new relativo a que ya estoy parado en recipe
  }

}

/* Ej
export interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  public form: FormGroup;

  public restaurants$: Observable<Data<Restaurant>>;
  public states$: Observable<Data<State>>;
  public cities$: Observable<Data<City>>;

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit(): void {
    this.createForm();

    this.states$ = this.restaurantService.getStates().pipe(
      map((res: ResponseData<State>) => {
        return {
          value: res.data,
          isPending: false
        }
      }),
      startWith({
        value: [],
        isPending: true
      })
    );

    this.cities$ = this.form.get('state').valueChanges.pipe(
      switchMap((state) => {
        if (state) {
          return this.restaurantService.getCities(state).pipe(
            map((res: ResponseData<City>) => {
              return {
                value: res.data,
                isPending: false
              }
            })
          );
        } else {
          return of({
            value: [],
            isPending: false
          })
        }
      }),
      startWith({
        value: [],
        isPending: true
      })
    )
    
  createForm(): void {
    this.form = this.fb.group({
      state: {value: ''},
      city: {value: ''},
    });

  }

}

    */
