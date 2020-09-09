import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';
import { ShoppingService } from '../../services/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

 /*  @ViewChild('nameInput', { static: false }) nameRef: ElementRef;
  @ViewChild('amountInput', { static: true }) amountRef: ElementRef; */

 /*  @Output() ingredientAdded = new EventEmitter<{ name: string, amount: number }>();  es el ingrediente*/
 /* @Output() ingredientAdded = new EventEmitter<Ingredient>(); */

  textError: string;
  other: boolean;

  /* aca para template */
  @ViewChild('formEdit') formTemplate: NgForm;
  private subscripIngred: Subscription;
  editMode = false;
  editIndexItem: number;
  editedItem: Ingredient;

  constructor(private service: ShoppingService, private router: Router) { }

  ngOnInit() {
    this.textError = '';
    this.subscripIngred = this.service.startIngredEdit
    .subscribe(
      (indice: number) => {
        this.editIndexItem = indice;
        this.editMode = true;
        this.editedItem = this.service.getIngredient(indice);
       // confirm('0k onInit edit ');
        this.formTemplate.setValue({  // form.patchValue
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          stockIncremental: null,
          stock: this.editedItem.amount
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
    const newIngr = new Ingredient(this.formTemplate.value.name, this.formTemplate.value.amount);
    this.service.addIngredient(newIngr);
    this.textError = 'well add ' + this.formTemplate.value.name;
    } */

    // aca 2 es el del form template
  onAddOrUpdateItemSubmit() {
    /*  alert('STATUS: ' + this.formTemplate.status);
     alert(this.formTemplate.value.name + '---' + this.formTemplate.value.amount); */

    const newIngr = new Ingredient(this.formTemplate.value.name, this.formTemplate.value.amount);
    if (this.editMode) {  // si editMode es true
      this.service.updateIngredient(this.editIndexItem, newIngr);
      this.textError = 'you update exelent';
      this.service.unText.next('FENIX  edit ');

      alert('Stock:' + this.formTemplate.value.stock);
      alert('Stock Inc:' + this.formTemplate.value.stockIncremental);
    /*  this.router.navigate(['/shopping', this.editIndexItem, 'edit'],
        /* {queryParams: { loEdito: 'si' },
          fragment: 'loading'
        }
      );*/
    } else {
      this.service.addIngredient(newIngr);
      this.textError = 'well add ' + this.formTemplate.value.name;
      this.service.unText.next('FENIX add');
     /*  this.router.navigate(['/shopping', 'id', 'edit'],
        {
          queryParams: { new: 'ingredient' }
        }
      ); */
    }
    this.editMode = false;
    this.formTemplate.reset();
  }
// aca 3
   /*  addIngred() {
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
  } */

  // onDelete(name: HTMLInputElement, amount: HTMLInputElement) {
    onDelete() {
    this.service.deleteIngred(this.editIndexItem);
    this.onClear();
  }

  onClear() {
    this.formTemplate.reset();
    this.editMode = false;
    this.textError = '';
  }
  
  /* addOther() {
    this.nameRef.nativeElement.value = '';
    this.amountRef.nativeElement.value = '';
    this.other = false;
    this.textError = '';
  } */

  getColor() {
    return  this.textError === 'you update exelent' ? 'red' : 'orange';

  }

}
