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

import { ShortNamePipe, FilterPipe, InstanceFilterPipe, SortPipe } from './pipes/index';


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

const PIPES = [
  ShortNamePipe,
    FilterPipe,
    InstanceFilterPipe,
    SortPipe
];

@NgModule({

  declarations: [
    ...COMPONENTS,
    ...CONTAINER,
    ...PIPES
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
