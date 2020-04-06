import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';



@NgModule({
  declarations: [
    ErrorComponent
  ],
  
  imports: [
    CommonModule
  ],

  /* importante es poner este exports para poder usar el componente */
  exports: [
    ErrorComponent
  ],

})
export class ErrorModule { }
