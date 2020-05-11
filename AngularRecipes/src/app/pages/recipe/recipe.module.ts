import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConvertToKPipe } from 'src/app/shared/pipes/convert-to-k.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  RecipeDetailsComponent,
  RecipeItemComponent,
  RecipeListComponent,
  RecipeStartComponent,
  RecipeStarComponent,
  RecipeEditComponent
} from './components/index';

import {
  RecipeComponent
} from './container/index';

import { RecipeService } from './services/recipe.service';

const COMPONENTS =
  [
    RecipeDetailsComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeStartComponent,
    RecipeStarComponent,
    RecipeEditComponent
  ];

const CONTAINER = [
  RecipeComponent

];
const MODULES = [
  CommonModule,
  FormsModule
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...CONTAINER
  ],

  imports: [
    ...MODULES,
    SharedModule
  ],

  // providers: [RecipeService], // aca agrego pues la uso en otros componentes de receta

   exports: [
     ...COMPONENTS,
     ...CONTAINER
   ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class RecipeModule { }
