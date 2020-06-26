import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivePostComponent } from './component/index';
import { PostComponent } from './container/post/post.component';


const MODULES = [
  CommonModule,
  HttpClientModule,
  FormsModule
  /* ,
  ReactiveFormsModule */
];
const CONTAINER = [
  PostComponent
];

const COMPONENTS = [
  ActivePostComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...CONTAINER,
    PostComponent
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

export class PostModule { }