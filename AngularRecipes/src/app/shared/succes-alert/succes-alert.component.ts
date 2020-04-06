import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-succes-alert',
  templateUrl: './succes-alert.component.html',
  styleUrls: ['./succes-alert.component.css']
})
export class SuccesAlertComponent implements OnInit {

  messagge = 'This is test succes';

  constructor() { }

  ngOnInit() {
  }

}
