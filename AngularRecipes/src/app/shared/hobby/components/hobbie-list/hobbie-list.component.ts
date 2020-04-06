import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hobbie-list',
  templateUrl: './hobbie-list.component.html',
  // styleUrls: ['./hobbie-list.component.css']
  // Donde styles permite crearlos en línea, y styleUrls permite enlazar con el css.
  styles: ['p{color: blue}']
})
export class HobbieListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
