import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HobbieDetailsComponent, HobbieFormComponent, HobbieListComponent } from './components/index';
import { HobbieComponent } from './container/index';

const MODULES = [
  CommonModule,
  FormsModule
];
const CONTAINER = [
  HobbieComponent
];
const COMPONENTS = [
  HobbieDetailsComponent,
  HobbieFormComponent,
  HobbieListComponent
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
export class HoobbiesModule { }
