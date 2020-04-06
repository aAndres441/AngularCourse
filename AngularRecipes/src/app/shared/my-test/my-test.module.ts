import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyTestComponent } from './container/my-test/my-test.component';

import { MyTestListComponent, MyTestFormComponent, MyTestBindingComponent } from './components/index';
import { MyDirectivasComponent } from './components/my-directivas/my-directivas.component';


const MODULES = [
  CommonModule,
  FormsModule
];
const CONTAINER = [
  MyTestComponent
];
const COMPONENTS = [
  MyTestListComponent,
  MyTestFormComponent,
  MyTestBindingComponent,
  MyDirectivasComponent
];


@NgModule({
  declarations: [
    ...COMPONENTS,
    ...CONTAINER
    ],

  imports: [
    ...MODULES
  ],

  exports: [
    ...COMPONENTS,
    ...CONTAINER
  ],
  
 schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyTestModule { }
