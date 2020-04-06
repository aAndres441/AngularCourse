import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html', // Podria poner esto: template:' <div><h3>Hola</h3></div>'
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() viewSelected = new EventEmitter<string>(); /* Ya no uso mas, sera  */

  collapsed = true;
  viewCarousel1: boolean;
  viewCarousel2: boolean;
  viewLorem: boolean;
  
  constructor() { }

  ngOnInit() {
  }

  /* Ya no uso mas, sera  */
  onSelect(dato: string) {
    this.viewSelected.emit (dato);
  }

  mostrar(){
    alert(' Hola HIJITA');
  }
  /* hopp-lst */

}
