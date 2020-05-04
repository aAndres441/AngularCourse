import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {

  /* @Input() recipeDet: Recipe; // lo saco pues ya no va asi, sera con url,
  seria si uso emmiter pero debo eliminar el @Input, ademas ne On init debo suscribir */
  recipeDet: Recipe;
  
 // aca pruebo con subject
 recipeSubj: Recipe;
 unName: string;
 private deactivatedSuscription: Subscription;
 private feni: Subscription;
 /////////////////////////////
  id: number;
  recName: string;
  reverse = true;
  propertyName = 'Andres';
  collapsed = true;
  seleccion = 'Sin seleccion';
  /* valorParaSwitch: string; */
  @ViewChild('valorParaSwitch', { static: false }) valorParaSwitch: ElementRef;
  msj: string;
  dato: string;


  customers: any []  = [
    {name : 'Bottom-Dollar Marketse' , city : 'Tsawassen'},
    {name : 'Alfreds Futterkiste', city : 'Berlin'},
    {name : 'Bon app', city : 'Marseille'}
];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.dato = '';

    // this.dato = this.id < 0  ? 'you can selet one recipe' : 'no';
    
   /*  this.recipeService.recipeSelected
    .subscribe(
      (recips: Recipe) => {
      this.recipeDet = recips; }
    ); */
   
   /*   const unaid = +this.route.snapshot.params.id; 
        this.recipeDet = this.recipeService.getOneRecipe(unaid); */ 

   /* 1-no uso esto, mejor el de abajo, funciona solo
    al cargar componente detalle la primra vez.
    Al acceder a parametros con snapshot, estos solo se actualizan 
    en el momento que se crea este componente.
     por lo tanto si trabajamos sin cambiar de pag, 
    no se  actualizaran datos en la otra parte de la pagina que tengo dividida.*/
    
    // 2- accedo a parametros y los suscribo como observables
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param.id;
        this.recipeDet = this.recipeService.getOneRecipe(this.id);
        
        // mi invento abajo
        this.dato = this.id === 1 || this.id === 0 ? 'si' : 'no';
       // alert('this.dato = this.id === 1 || this.id === 0 ? si : no; ' +  this.dato);
        }
    );
   // this.route.fragment.subscribe();

    this.recName = this.recipeDet.name;
   // this.title = this.recipeDet.rating.toString();

    // pruebo Subject, me parece que no deberia pasar a la misma vez la receta por url, por eso que no anda is lo hago.
       // Para Subject: acordarse de ondestroy y de asignar variable para desuscript
   /*  this.deactivatedSuscription = this.recipeService.recipeSelectSub.subscribe(dato => {
      this.recipeSubj = dato;
      alert ( ' ToString ' + this.recipeSubj.toString());
    }); */

  }

  ngOnChange() {
    this.recipeDet = this.recipeService.getOneRecipe(this.id);
  }

  ngOnDestroy(): void {
    /* this.deactivatedSuscription.unsubscribe();*/
  }

  onAddToShoppingList() {
    // obtenemos los ingred de esta receta, que luego pasaremos con otro servicio a lista compras
    this.dato = this.valorParaSwitch.nativeElement.value;
    if ( this.dato !== '') {
    this.recipeService.addIngredientsToShoppingList(this.recipeDet.ingredients);
    alert('El dato es: ' + this.dato);
    } else {
      alert('Seleccione un  dato');
    }
  }

  alertConData(newDato: string) {
    this.dato = newDato;
    switch (this.dato) {
      case 'shoppingList':
        alert('SWITCH: seleccionado - ' + this.dato);
        this.onAddToShoppingList();
        break;
      case 'mute':
        alert('SWITCH: seleccionado - ' + this.dato);
        break;
      case 'enable':
        alert('SWITCH: seleccionado -' + this.dato);
        break;
      case 'home':
        alert('SWITCH: seleccionado -' + this.dato);
        break;
      default:
        alert('SWITCH:  con Ferrai esta todo mal');
        break;
    }
  }

  viewJuego(){
    alert ('Fenix');
    this.router.navigate(['../','/shopping',1, 'list'],
    {
      queryParams: { ID: 'Pepe' },
      fragment: 'loading' + 'Hello'
    }
    );
  }
  onNotify(message: string): void {
    confirm(message);
    this.msj = message;
  }

  onEditRecipe() {
    // las dos rutas de abajo son iguales
    this.router.navigate(['edit'], {relativeTo: this.route,
    queryParams: {ID: this.id},
    fragment: this.recName}
  );
  
     
     /* this.router.navigate(['../', this.id. 'edit'], {      
      queryParams: { ID: this.id },
      fragment: 'editing'
    }); */
   
  }

}
