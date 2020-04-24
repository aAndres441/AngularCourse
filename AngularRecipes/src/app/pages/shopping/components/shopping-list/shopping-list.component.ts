import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../../../shared/ingredient/ingredient.model';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { ShoppingService } from '../../services/shopping.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

@Output() delete = new EventEmitter<number>();

misIngredientes: Ingredient[];
private ingChangeSubscrib: Subscription; // para desuscribir ingredientsChange2 del servicio

@Input() txtError = 'HOLA';
txtError2 = 'HOLA';

constructor(private servicio: ShoppingService) { }

  ngOnInit() {
    // aca llamo a la copia porque en el servicio tiene slice()
    this.misIngredientes = this.servicio.getIngredients();
    // y aca veo los cambios en la copia y los guardo, no seria necesario si trabajo sin slice()
    
    // this.servicio.ingredientsChange   // lo cambio por subject y lo guaro para desuscribir
    this.ingChangeSubscrib = this.servicio.ingredientsChange2
    .subscribe(
      (ings: Ingredient[]) => {
        this.misIngredientes = ings;
        alert('largo' + this. misIngredientes.length);
      }
    );
    
  }

 /* no los uso por ahora*/
  /* oningredientAdded() {
    this.misIngredientes.push(this.ingredient);
  } */

  /* oningredientAdded(ingr: Ingredient) {
    this.misIngredientes.push(ingr);
  } */

  /* toDelete(pos: number) {
    alert(' your select is: ' + pos ) ;
    this.delete.emit(pos);
    // antes emitia, ahora subject como onEditItem
  } */

  onEditItem(index: number) { // (index: number) o (ingred: Ingredient)
// alert('NAME ' + ingred.name + 'id: ' + ingred.id);

/* agrego este subject en el servicio para escucharlo donde quiuera,
 sera en shoppingComponent, en su onInit() ver*/
this.servicio.startIngredEdit.next(index); // .next(index); o (ingred.id)
// alert(' shopping-list id= ' + index + ' ok');
  }


  ngOnDestroy() {
    this.ingChangeSubscrib.unsubscribe();
  }

}
