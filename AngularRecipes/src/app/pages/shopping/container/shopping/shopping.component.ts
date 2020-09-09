import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';
import { ShoppingService } from '../../services/shopping.service';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnDestroy {

  title = 'SHOPPING';

/* @Output() agrega = new EventEmitter<{name: string, amount: number}>(); */
/* @Input() agrega = new EventEmitter<{elIngredienteAgregado}>(); */
iWantAdd: boolean;
textoError = '';
ingredients: Ingredient [] = [];
elem: Ingredient;
private unTexto: Subscription; // para suscribir unTexto string del servicio

constructor(private service: ShoppingService,
            private route: ActivatedRoute,
            private router: Router) { }

  ngOnInit() {
    // toma el evento emitido al agregar ingred en el servicio
    /* this.service.ingredNew
      .subscribe(
        (ingred: Ingredient) => {
          this.newIngredAdded = ingred;
        }); */

    this.unTexto = this.service.unText
    .subscribe(
      (data: string) => {
        this.textoError = data;
      });

    alert(this.ingredients.length);

  }

  onDelete(pos: number) {
    this.ingredients.forEach(element => {
        this.ingredients.splice(pos, 1);
    });
    this.textoError = 'pos';
    alert('this.textoError = ' + this.ingredients[pos].name);
    alert('SE ELIMINA PAN 2' + this.ingredients.length);
    alert('SE ELIMINA PAN' + this.elem.name);
  }

  edit() {
    this.router.navigate(['/shopping','id', 'edit'],
    // '../', this.id, 'edit'
     /*  {queryParams: { loEdito: 'si' },
        fragment: 'loading'
      } */
      );
  }

  onEdit() {
    /* ya que estamos en la ruta Server solo cargamos la ruta relativa  edit ,
    y guardamos datos de url con queryParamsHandling*/    
    this.router.navigate(['/shopping', 'list'],
    /* {relativeTo: this.route, 
      queryParams: { algo: 'list' },
        fragment: 'list'
     } */
     );
  }
 /* queryParamsHandling: 'preserve' */

 ngOnDestroy(): void {
  this.unTexto.unsubscribe();
}

}
