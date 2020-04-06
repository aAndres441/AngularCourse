import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { PaymentModule } from './payment/payment.module';
import { RecipeModule } from './recipe/recipe.module';
import { ShoppingModule } from './shopping/shopping.module';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';

const COMPONENTS = [
];

const MODULES = [
  CommonModule,
  FormsModule,
  /* RouterModule,
   */
  PaymentModule,
  RecipeModule,
  ShoppingModule,
  AccountModule,
  UserModule
];

@NgModule({
  declarations: [
     ...COMPONENTS

  ],

  imports: [
    ...MODULES
  ],

  exports: [
    ...COMPONENTS,
    ...MODULES
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class PagesModule { }
