import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServerComponent } from './container/server.component';

import {
    ListServerComponent,
    EditServerComponent,
    NewServerComponentComponent
  } from './components/index';

  
import { ErrorModule } from '../shared/error/error.module';
import { SharedModule } from '../shared/shared.module';
import { BorrarComponent } from '../borrar/borrar.component';

import { ShortNamePipe } from './pipes/short-name.pipe';
import { FilterPipe } from './pipes/filter.pipe';

const COMPONENTS =
[
  ListServerComponent,
   EditServerComponent,
   NewServerComponentComponent
];

const CONTAINER = [
  ServerComponent
];

const MODULES = [
  CommonModule,
  FormsModule,
  SharedModule,
  ReactiveFormsModule
];

@NgModule({

  declarations: [
    ...COMPONENTS,
    ...CONTAINER,
    ShortNamePipe,
    FilterPipe
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
