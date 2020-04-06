import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotExpr } from '@angular/compiler';
import { UserServiceSubject } from '../../userServiceSubject';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  allUsers: User[];
  oneUser: User;
  id: number;

  datoRandom1: boolean;
  datoRandom2: boolean;

  constructor(private service: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private userServiceSubject: UserServiceSubject) { }

  ngOnInit() {
    this.allUsers = this.service.getUsers();

    this.service.usersChanges.subscribe(
      (userrs: User[]) => {this.allUsers = userrs; }
    );
    
  }


  /* tthis.route.params.subscribe(
      (param: Params) => {
        this.id = +param.id;

        this.editMode = param.id != null;
 */

  delete(dato: number){
    this.router.navigate([dato],
      { relativeTo: this.route,
        queryParams: { numerEdit: '108' },
        fragment: 'fragmento'
      });
  }

  activateEmitter() {
    this.datoRandom1 = (Math.floor(Math.random() * 256) % 2 === 0 ? true : false);  //  Math.random();

    this.userServiceSubject.eveActivatedEmitter.emit(this.datoRandom1);
  }

  activateSubject() {
    this.datoRandom2 = (Math.floor(Math.random() * 256) % 2 === 0 ? true : false);  //  Math.random();

    this.userServiceSubject.subjActivatedSubject.next(this.datoRandom2);
  }

}
