import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';
import { ShoppingService } from '../../services/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('nameInput', { static: false }) nameRef: ElementRef;
  @ViewChild('amountInput', { static: true }) amountRef: ElementRef;

 /*  @Output() ingredientAdded = new EventEmitter<{ name: string, amount: number }>();  es el ingrediente*/
 /* @Output() ingredientAdded = new EventEmitter<Ingredient>(); */
   
  textError: string;
  other: boolean;

  /* aca para template */
  @ViewChild('formEdit', { static: false }) f: NgForm;
  private subscripIngred: Subscription;
  editMode = false;
  editIndexItem: number;
  editedItem: Ingredient;

  constructor(private service: ShoppingService) { }

  ngOnInit() {
    this.textError = '';
    this.subscripIngred = this.service.startIngredEdit.subscribe(
      (indice: number) => {
        this.editIndexItem = indice;
        this.editMode = true;
        this.editedItem = this.service.getIngredient(indice);
        confirm('0k ');
        this.f.setValue({  // form.patchValue
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });

      }
    );

  }
  ngOnDestroy() {
    this.subscripIngred.unsubscribe();
  }

  /* para form template 2 formas, pasando referencia del form o no */
  
    // aca 1
    /*  onAddItem(fo: NgForm) {
    const value = fo.value; 
    alert(value.name + '---amount' + value.amount);
    const newIngr = new Ingredient(this.f.value.name, this.f.value.amount);
    this.service.addIngredient(newIngr);
    this.textError = 'well add ' + this.f.value.name;
    } */

    // aca 2
   onAddItem() {    
    alert( 'STATUS: ' + this.f.status );
    alert(this.f.value.name + '---' + this.f.value.amount);

    const newIngr = new Ingredient(this.f.value.name, this.f.value.amount);
    this.service.addIngredient(newIngr);
    this.textError = 'well add ' + this.f.value.name;
  }
// aca 3
    addIngred() {    
    const ingredName = this.nameRef.nativeElement.value;
    const ingredAmount = this.amountRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredName, ingredAmount);
    
    if (newIngredient.amount > 0) {
      this.service.addIngredient(newIngredient);
      this.textError = 'exelent';
    } else {
      this.textError = 'Incorrect data or Fake news';
    }
    this.other = true;
  }

  deleteIngred(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    alert('Name name ' + nameInput.value + 'New amount ' +  amountInput.value);
  }
  
  addOther() {
    this.nameRef.nativeElement.value = '';
    this.amountRef.nativeElement.value = '';
    this.other = false;
    this.textError = '';
  }

  getColor() {
    return this.textError === 'exelent' ? 'yellow' : 'orange';

  }

}
