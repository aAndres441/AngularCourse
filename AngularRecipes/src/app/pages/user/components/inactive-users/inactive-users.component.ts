import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {

  /* @Input()  users: string[];*/
  /*  @Output() userSetToActive = new EventEmitter<number>(); */

  /* users: string[]; */
  users: User[];

  constructor(private serviceUsu: UserService) { }

  ngOnInit() {
    this.users = this.serviceUsu.getInactiveUsers();
  }

  ngOnChange() {
    this.users = this.serviceUsu.getInactiveUsers();
  }

  onSetStatus(id: number) {
    /*  this.userSetToInactive.emit(id); 
     this.serviceUsu.onSetToInactive(id);*/
     this.serviceUsu.changeStatus(id, 'active');
   }

}
