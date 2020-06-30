import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-my-test-form',
  templateUrl: './my-test-form.component.html',
  styleUrls: ['./my-test-form.component.css']
})
export class MyTestFormComponent implements OnInit {
  
  mio = false;
  userName = ' ';
  lastName = 'Manini';
  isActualizado = false;
  status = 'Ocupado';
  alimentos = ['Porotos', 'Fiambre'];
  view = false;
  click: number;
  clicks = [];
  log = [];
  dates = [];
  newCity = '';

  
prueboName2 = '';
@ViewChild('unValor') unValor: ElementRef;

  @Output() eventoCity = new EventEmitter<{city: string, alim: string}>();
 
  /* referencia local que podria ser el mismo compnente */ 
  @ViewChild('alimento') alimento: ElementRef;
  
  mascotas = [
    {
      tipo: 'Gato',
      gender: 'Machito'
    },
    {
      tipo: 'Lombriz',
      gender: 'Nena'
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
  eliminar() {
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
  getStatus() {
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
  addDates() {
    this.dates.push(new Date());
  }
  reset() {
    this.clicks.splice(0);
    this.click = 0;
    this.dates.splice(0);
    this.log.splice(0);
  }

  cargaDatos(address: HTMLInputElement) {
    
    this.eventoCity.emit({
      city: this.newCity,
      alim: this.alimento.nativeElement.value
    });
    
    this.alimentos.push(this.alimento.nativeElement.value);

   /*  alert('address - ' +  address.value);
    alert('city - ' + this.newCity);
    alert('alimento - ' + this.alimento.nativeElement.value);
 */
    this.alimento.nativeElement.value = '';
  }
  /*  getColor() {
     if (this.click > 5) {
       return 'blue';
     }
   } */
   changeName1() {
    this.prueboName2 = this.unValor.nativeElement.value;   
    confirm('probando ' + this.prueboName2);
    }
   changeName2(event: Event) {
    this.prueboName2 = (event.target as HTMLInputElement).value;
    confirm('prueboName ' + this.prueboName2);
  }

}



