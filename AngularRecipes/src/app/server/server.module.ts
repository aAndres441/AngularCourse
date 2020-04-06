import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServerComponent } from './container/server.component';

import {
    ListServerComponent,
    EditServerComponent
  } from './components/index';

  
import { ErrorModule } from '../shared/error/error.module';
import { SharedModule } from '../shared/shared.module';
import { BorrarComponent } from '../borrar/borrar.component';

const COMPONENTS =
[
  ListServerComponent,
   EditServerComponent
];

const CONTAINER = [
  ServerComponent
];

const MODULES = [
  CommonModule,
  FormsModule,
  SharedModule
];

@NgModule({

  declarations: [
    ...COMPONENTS,
    ...CONTAINER
  ],

  imports: [
    ...MODULES,
  ],

  exports: [
    ...COMPONENTS,
    ...CONTAINER,
    /* ...MODULES */
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ServerModule { }
