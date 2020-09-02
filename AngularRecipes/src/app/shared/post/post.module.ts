import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivePostComponent, NewComponent } from './component/index';
import { PostComponent } from './container/post/post.component';
import { LoggedComponent } from './component/logged/logged.component';
import { ImageDirective } from './component/helpers/image.directive';


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
  NewComponent,
  LoggedComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...CONTAINER,
    ImageDirective
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
