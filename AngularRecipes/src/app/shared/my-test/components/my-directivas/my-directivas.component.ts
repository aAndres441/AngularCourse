import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-my-directivas',
  templateUrl: './my-directivas.component.html',
  styleUrls: ['./my-directivas.component.css']
})
export class MyDirectivasComponent implements OnInit {

  /* numbers = [1, 2, 3, 4, 5]; */
  oddNumbers = [1, 3, 5, 7];
  evenNumbers = [2, 4, 6];
  onlyOdd: boolean;

  /* valorParaSwitch: string; */
  @ViewChild('valorParaSwitch', { static: false }) valorParaSwitch: ElementRef;

  valor = 0;

  constructor() { }

  ngOnInit() {
  }

  addNumero() {
    this.valor = this.valorParaSwitch.nativeElement.value;
    if (this.valor == 1 || this.valor == 10) {
      alert(this.valor + 'IMMPECA el  valor ' + this.valor);
      console.log(this.valor + 'IMMPECA el  valor ' + this.valor);
    }else
    alert(this.valorParaSwitch.nativeElement.value + ' valor ' + this.valor);
 
   
  }
  

}
