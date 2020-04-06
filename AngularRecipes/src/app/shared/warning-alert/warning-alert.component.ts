import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
/*   template:  '
  <p>this is a warning !</p>
  ', */
 
  styleUrls: ['./warning-alert.component.css']
 /*  styles:[
    p {
      padding: 10px;
      backgrownd-color:  yellow;
      border:1px solid red;
    } 
  ]*/
})
export class WarningAlertComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
