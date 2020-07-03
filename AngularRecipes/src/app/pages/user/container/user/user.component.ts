import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../../user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { UserServiceSubject } from '../../userServiceSubject';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy{

 /*  users: User[];
  activeUsers: string[];
  inactiveUsers: string[]; */
id: number;
emi = false;
subject = false;
private deactivatedSuscription: Subscription;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private userServiceSubject: UserServiceSubject) { }

  ngOnInit() {
    
    /* this.activeUsers = this.serviceUser.activeUsers;
    this.inactiveUsers = this.serviceUser.inactiveUsers; */

    /* this.route.params.subscribe (
      (param: Params) => {
       this.id = +param.id;
     });
     alert(this.id); */

     // Para Emitter:  configuramos el oyente del evento emitido por subject desde el componente lista
         this.userServiceSubject.eveActivatedEmitter.subscribe(dato => {
      this.emi = dato;
    });

    // Para Subject: acordarse de ondestroy y de asignar variable para desuscript
         this.deactivatedSuscription = this.userServiceSubject.subjActivatedSubject
          .subscribe(dato => {
            this.subject = dato;
            }
          );

      /* if (this.subject) {
        this.subject = false;
        confirm('SUBJECT 1: ' + dato + '---' + this.subject);
      } else {
        this.subject = dato;
        confirm('SUBJECT 2: ' + dato + '---' + this.subject);
      } */

  }

  toList() {
    this.router.navigate(['/users', 'list']
    );
    /*this.router.navigate(['../'],
  { relativeTo: this.route
    queryParams: {algo: 'users'},
    fragment: 'users'}
    ); */
  }
  toUsuTest() {
    this.router.navigate(['/users', 'usuTest'],
      /* {
       relativeTo: this.route,
       queryParams: { algo: 'usuTest' },
       fragment: 'usuTest'
     } */
    );
  }
  toUsuForm() {
    this.router.navigate(['/users', 'id', 'new'],
      /* {
       relativeTo: this.route,
       queryParams: { algo: 'usuTest' },
       fragment: 'usuTest'
     } */
    );
  }
  toOneUsu() {
    this.router.navigate(['/users', 2],
      /* {
       relativeTo: this.route,
       queryParams: { algo: 'usuTest' },
       fragment: 'usuTest'
     } */
    );
  } 

  viewActive() {
    this.router.navigate(['active'],
      {
        relativeTo: this.route,
        queryParams: { algo: 'active' },
        fragment: 'active'
      }
    );
  }

  viewInactive() {
    this.router.navigate(['/users', 'inactive'],
      {
        queryParams: { algo: 'inactive' },
        fragment: 'inactive'
      }
    );
  }

  invent1() {
    this.router.navigate(['/shopping', 'id', 'edit']);
  }
  invent2() {
    this.router.navigate(['/test', 'bindeo']);
  }

 ngOnDestroy(): void {
   this.deactivatedSuscription.unsubscribe();
 }

}
