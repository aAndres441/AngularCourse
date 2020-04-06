import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Kikiriya';
  subTitle = 'A glass of dandelion wine';

  constructor() { }

  ngOnInit() {
  }

}
