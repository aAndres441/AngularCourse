import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  /* styleUrls: ['./user-test.component.css'] */
  styles: [ '.onLine {color: white; font-size:20px; background-color:rgb(178, 224, 11);}']
})
export class UserTestComponent implements OnInit {
  mio = false;
  userName = ' ';
  lastName = 'Manini';
  isActualizado = false;
  status = 'Ocupado';
  alimentos = ['a1', 'a2'];
  view = false;
  click: number;
  clicks = [];
  log = [];
  dates = [];
  mascotas = [
    {
    tipo : 'Gato',
    gender : 'Machito'
  },
  {
    tipo : 'Lombriz',
    gender : 'verde'
  }
  ];

  constructor() {
    this.status = Math.random() > 0.5 ? 'Libre' : 'Ocupado';
    // random da numero entre 0 y 1, en este caso si es > 0.5 hace algo
    this.click = 0;
   }

  ngOnInit() {
  }

  addUser() {
    this.alimentos.push(this.lastName);
/* this.isActualizado = true; */
/* this.status = 'Si creado de nombre: ' + this.userName; */

  }
  eliminar(){
    // tslint:disable-next-line: no-unused-expression
    this.alimentos.splice(0);
  }

  actualiza() {
    this.isActualizado = !this.isActualizado;
    /* this.status = Math.random() > 0.5 ? 'Libre' : 'Ocupado'; */
    if (this.status === 'Ocupado') { this.status = 'Libre'; }
    else if (this.status === 'Libre') { this.status = 'Ocupado'; }

  }
  getColor() {
    return this.status === 'Ocupado' ? 'yellow' : 'orange';
  }
  getStatus(){
    return this.status;
  }
  toogleView1() {
    this.view = !this.view;
    this.click++;
    this.clicks.push(this.click);
  }

  toogleView2() {
    this.log.push(this.log.length + 1);
  }
  addDates(){
    this.dates.push(new Date());
  }
  reset() {
    this.clicks.splice(0);
    this.click = 0;
    this.dates.splice(0);
    this.log.splice(0);
  }
 /*  getColor() {
    if (this.click > 5) {
      return 'blue';
    }
  } */
}

