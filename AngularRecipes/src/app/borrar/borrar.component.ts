import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.component.html',
  styleUrls: ['./borrar.component.css']
})
export class BorrarComponent implements OnInit {

  name = 'Inicia';
  price = 0;

  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {   
  }
  
  changeName(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
  }
  
  updateLastName(event): any {
    this.name = event.target.value;
  }

  changePrice(event: Event) {
    this.price = Number((event.target as HTMLInputElement).value); // (<HTMLInputElement>event.target).value    
  }
  
  updatePrice(e): any {
    this.price = e.target.value;
  }
  
  /* window.addEventListener('load', inicio, false);

    function inicio() {
        document.getElementById('guardar').addEventListener('click', guardar, false);
        document.getElementById('traducir').addEventListener('click', recuperar, false);
    }

    function guardar(evt) {
        localStorage.setItem(document.getElementById('ingles').value, document.getElementById('castellano').value);        
        document.getElementById('ingles').value='';
        document.getElementById('castellano').value='';
    }

    function recuperar(evt) {
        if (localStorage.getItem(document.getElementById('ingles').value) == null) 
            alert('No está almacenala la palabra '+document.getElementById('ingles').value);
        else  
            document.getElementById('castellano').value=localStorage.getItem(document.getElementById('ingles').value);
    } */

}
