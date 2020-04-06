import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { PaymentComponent } from './container/index';

/* import { PaymentComponent } from './container/index';
import { PaymentFormComponent } from './components/index'; */

const COMPONENTS =
[
  PaymentFormComponent
];

const CONTAINER = [
  PaymentComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...CONTAINER,
    
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
export class PaymentModule { }
