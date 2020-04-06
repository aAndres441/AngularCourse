import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShoppingEditComponent, ShoppingListComponent } from './components/index';
import { ShoppingComponent } from './container/shopping/shopping.component';


const COMPONENTS = [
  ShoppingListComponent,
  ShoppingEditComponent
];
const CONTAINER = [
  ShoppingComponent
]

@NgModule({
  declarations: [
  ...COMPONENTS,
  ...CONTAINER
  ],

  imports: [
    CommonModule,
    FormsModule,
  ],

  exports: [
    ...COMPONENTS,
    ...CONTAINER
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class ShoppingModule { }
