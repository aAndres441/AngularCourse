import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', { static: false }) nameRef: ElementRef;
  @ViewChild('amountInput', { static: true }) amountRef: ElementRef;

 /*  @Output() ingredientAdded = new EventEmitter<{ name: string, amount: number }>();  es el ingrediente*/
 /* @Output() ingredientAdded = new EventEmitter<Ingredient>(); */
   
  textError: string;
  other: boolean;
  
  constructor(private service: ShoppingService) { }

  ngOnInit() {
    this.textError = '';
  }

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
