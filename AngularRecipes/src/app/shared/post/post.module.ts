import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivePostComponent, NewComponent } from './component/index';
import { PostComponent } from './container/post/post.component';


const firebase = require('firebase/app');

const MODULES = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule
];
const CONTAINER = [
  PostComponent
];

const COMPONENTS = [
  ActivePostComponent,
  NewComponent
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

  providers: [
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PostModule { }
