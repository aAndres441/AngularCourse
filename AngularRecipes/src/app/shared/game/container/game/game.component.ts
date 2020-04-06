import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  /* numer: number; */
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];
 
  constructor() {
   /*  this.oddNumbers = [];
    this.evenNumbers = []; */
   }

  ngOnInit() {
  }

  onIntervalFire(dato: number) {
    /* console.log('Feni noma onIntervalFire()' + dato);
    this.numer = dato; */
    if (dato % 2 === 0) {
      this.evenNumbers.push(dato);
    /* // tslint:disable-next-line: curly */
    } else {
    this.oddNumbers.push(dato);
    }
  }


}
