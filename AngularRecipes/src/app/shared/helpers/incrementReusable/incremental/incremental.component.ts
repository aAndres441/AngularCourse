import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-incremental',
  templateUrl: './incremental.component.html',
  styleUrls: ['./incremental.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IncrementalComponent),
      multi: true
    }
  ]
})
export class IncrementalComponent implements OnInit, ControlValueAccessor {

  currentValue = 0;
  isDisabled = false;

  ngOnInit(): void {
  }

  myOnChange = (_: any) => {};  // es una funcion vacia que recibe un valor any
  myOnTouch = () => {};  // es una funcion vacia que NO recibe un valor any

  add(): void {
    this.currentValue = this.currentValue++;
    this.myOnTouch();
    this.myOnChange(this.currentValue);
  }

  sub(): void {
    this.currentValue = this.currentValue --;
    this.myOnTouch();
    this.myOnChange(this.currentValue);
  }

  /* Estos metodos de la interface pueden recibir cualquier tipo de valor
  ej  writeValue(value: string): void {
    throw new Error("Method not implemented.");
  }*/

  writeValue(value: number): void {
    if (value) {
      this.currentValue = value;
    }
  }

  registerOnChange(fn: any): void {  // recibe siempre una funcion que se llamarà
    this.myOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.myOnTouch = fn;
  }

  setDisabledState(state: boolean): void {
    this.isDisabled = state;
  }

}
