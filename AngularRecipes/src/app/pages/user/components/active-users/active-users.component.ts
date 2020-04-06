import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'] 
})

export class ActiveUsersComponent implements OnInit {
  
 /*  @Input() users: string[];
  @Output() userSetToInactive = new EventEmitter<number>(); */

  users: User[] = [];

  constructor(private serviceUsu: UserService) { }

  ngOnInit() {
    this.users = this.serviceUsu.getActiveUsers();
  }

  ngOnChange(){
    this.users = this.serviceUsu.getActiveUsers();
  }
  
  onSetStatus(id: number) {
   /*  this.userSetToInactive.emit(id); 
    this.serviceUsu.onSetToInactive(id);*/
    this.serviceUsu.changeStatus(id, 'inactive');
  }
}
