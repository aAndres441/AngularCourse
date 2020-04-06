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
private ingChangeSubscrib: Subscription; // para desuscribir

@Input() txtError= 'HOLA';

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

  toDelete(pos: number) {
    alert(' your select is: ' + pos + 'text:' + this.txtError ) ;
    this.delete.emit(pos);
  }

  ngOnDestroy() {
    this.ingChangeSubscrib.unsubscribe();
  }

}
