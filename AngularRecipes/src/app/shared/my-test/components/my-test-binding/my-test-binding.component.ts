import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-my-test-binding',
  templateUrl: './my-test-binding.component.html',
  /* styleUrls: ['./my-test-binding.component.css'] */
  styles: ['.onLine {color: white; font-size:15px; background-color:violet;}']
})

export class MyTestBindingComponent implements OnInit {

  /* importa properties desde el padre container */
  @Input() lstComidas: { type: string, name: string, content: string };


  /* ABAJO 2 formas de crear un Array */
  /* @Input() lstComidas = new Array<any>(); 
  @Input() lstComidas: (type: string, name: string, content: string ) => any[];

  @Input() bebida1: string;

  /*  importa con alias, que se usara desde afuera como ej para cargar el dato  */
  @Input () myBebida: string;

  mio = false;
  userName = ' ';
  lastName = 'Manini';
  isActualizado = true;
  status = 'Ocupado';
  /* para databinding */
  miPlaceholder = "Ingrese algo aqui";
  miSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUXD17prFtnvxtGWIzQ6wiktS2AzY0RRo6w&usqp=CAU";
  miTexto = 'Esto es Data-Binding';
  /* termina databinding */
  alimentos: string[];
  view = false;
  click: number;
  clicks = [];
  log = [];
  dates = [];
  esOno = ''; // usado para switch
  mascotas = [
    { tipo: 'Gato',
      gender: 'M',
      estado: true,
      condition: 'Cachorro'
    },
    { tipo: 'Lombriz',
      gender: 'H',
      estado: false,
      condition: 'Joven'
    },
    { tipo: 'Horse',
      gender: 'X',
      estado: true,
      condition: 'Adulto'
    },
    { tipo: 'Bird',
      gender: 'X',
      estado: false,
      condition: 'Joven'
    }
  ];

  constructor() {
    this.status = Math.random() > 0.5 ? 'Libre' : 'Ocupado';
    // random da numero entre 0 y 1, en este caso si es > 0.5 hace algo
    this.click = 0;

    this.alimentos = ['a1', 'a2'];

    setInterval(()=> this.lastName = "Geronimo",3000);
    setInterval(()=> this.isActualizado = true,3000);
  }

  ngOnInit() {
    /* this.status = 'Ocupado'; */
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
    console.log('es: '  +  this.status);

    /* this.status = 'Ocupado' ? 'Libre' : 'Ocupado'; */

    /*no me anda el switch como debe ser  */
    /* switch (this.status) {
      case 'Ocupado':
        this.status = 'Libre ';
        break;
      case 'Libre':
        this.status = 'Ocupado';
        break;
      default: ;
        break;
    }
    console.log('es: ' + this.status); */
  }

  getColor() {
    return this.status === 'Ocupado' ? 'yellow' : 'black';
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
  /*  getColor() {
     if (this.click > 5) {
       return 'blue';
     }
   } */

   /* un SWITCH */
   queEs(lolo: string) {
    switch (lolo) {
      case 'a':
        this.esOno = 'SI';
        console.log('es: ', this.esOno);
        break;
      case 'b':
        this.esOno = 'NO';
        console.log('es: ', this.esOno);
        break;
      default:
        this.esOno = ' Va de nuevo';
        console.log('es: ', this.esOno);
        break;
    }   
  }

  cambiarTexto(): void{
    this.miTexto = 'cambio Zito, two way data-binding';
  }

  toogle(): void{
this.isActualizado = !this.isActualizado;
  }

  

}

