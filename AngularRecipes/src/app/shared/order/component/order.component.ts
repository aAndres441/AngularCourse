import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { analytics } from 'firebase';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  isFetchingPost = false;

  constructor() { }

  public raza: any;
  
  public mascotas: any = [];

  prueboName2 = '';
@ViewChild('unValor') unValor: ElementRef;
tecla3=window.addEventListener("keydown",this.myFunction,false);


  ngOnInit(): void {   

    this. mascotas=["perro 🐕‍🦺",  "gato 🐈 ", "pajaro 🦜", this.raza={string:'negro',boolean:true, number:4}];
    alert('tecla'+ this.tecla2);

    console.log(this.mascotas.length);
    console.log(this.mascotas[3]);
    this.mascotas.push("robot 👾");
    console.log(this.mascotas.length);
    console.log(this.mascotas);
    const res= ()=> {`Hola soy: ${this.mascotas[3]}`};
    console.log(res);
    console.table(this.mascotas);

  }
  cambioEventoTecla2(){
    confirm('NO');
  }

  cambioEventoTecla(){
    //window.onkeydown = this.cambioFuncionTecla();
    
    // this.cambioFuncionTecla(    
      if(Number(this.unValor.nativeElement.value) === 27){
        confirm('FENI');
    }else(confirm('NO'));
  }
  cambioFuncionTecla(){
    if(this.unValor){ 
      const tecla= this.unValor
      if( tecla.nativeElement.value() === 27){
        confirm('FENI');
    }}else(confirm('NO'));
  }

  changeName1() {
    this.prueboName2 = this.unValor.nativeElement.value;   
    confirm('probando ' + this.prueboName2);
    }

   guardar(evt) {
     /*  localStorage.setItem(document.getElementById('ingles').value, document.getElementById('castellano').value);
      document.getElementById('ingles').value='';
      document.getElementById('castellano').value=''; */
      console.log('Evento ', evt);      
  }
   aveeer() {
    //document.getElementById('unValor').addEventListener('click', this.guardar, false);
    
    alert('tecla 3'+ this.tecla3);
  }
  //object.addEventListener("keydown", myScript);


 /*  a = window.onkeydown.arguments(this.myFunction());*/

   t = window.onkeypress; 
   tecla2 = Number(window.onkeydown);
  myFunction(){
    alert('tecla'+ this.tecla2);
    
    let tecla = KeyboardEvent.DOM_KEY_LOCATION_STANDARD;
    if (this.tecla2 ===  27){
      confirm ( 'SIII');
    }alert('NOOO');

    //const ev: any;
    
    alert("hola");
    //this.cambioEventoTecla();
  }

  
}
