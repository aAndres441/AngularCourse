import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent} from './container/index';
import { MyAccountComponent, NewAccountComponent} from './components/index';


const COMPONENTS =
[
  AccountComponent
];

const CONTAINER = [  
  MyAccountComponent,
  NewAccountComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...CONTAINER,
  ],

  imports: [
    CommonModule
  ],

  exports: [
    ...COMPONENTS,
    ...CONTAINER
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AccountModule { }
