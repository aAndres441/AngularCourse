import { Component, OnInit } from '@angular/core';
import { IHobby } from '../../hoobbies.model';

@Component({
  selector: 'app-hobbie',
  templateUrl: './hobbie.component.html',
  styleUrls: ['./hobbie.component.css']
})
export class HobbieComponent implements OnInit {

  hobbies: IHobby[] = [];
  oneHobby: IHobby;
  
  constructor() {
    this.hobbies = [
      {id: 11, name: 'Comet', description: 'Verde', imageUrl: null, timeStamp:  new Date()},
      {id: 12, name: 'Spinning top', description: 'Azul', imageUrl: null, timeStamp:  new Date()},
      {id: 13, name: 'Ball', description: 'Square', imageUrl: null, timeStamp: new Date()}
    ];
  }

  ngOnInit() {
  }

}
