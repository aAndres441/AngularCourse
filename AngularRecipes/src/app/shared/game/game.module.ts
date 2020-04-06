import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EvenComponent, OddComponent, GameControlComponent } from './components/index';
import { GameComponent } from './container/index';


const MODULES = [
  CommonModule,
  FormsModule
];
const CONTAINER = [
  GameComponent
];
const COMPONENTS = [
  EvenComponent,
  OddComponent,
  GameControlComponent
];

@NgModule({
  declarations: [
    ...CONTAINER,
    ...COMPONENTS
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
export class GameModule { }
