import { Injectable, EventEmitter } from '@angular/core';
import { UsersCounterService } from './users-counter.service';
import { User } from 'src/app/pages/user/user.model';

// tiene injectado otro servicio, UsersCounterService
@Injectable()

export class UserService {

  /* private users: User[] = new Array<User>(); */
  private users: User[] = [
    new User(11, 'Ale', 'Santana', 'active'),
    new User(12, 'Rolo', 'Duarte', 'inactive'),
    new User(13, 'Analia', 'Lacalle', 'active'),
    new User(14, 'Marcos', 'Kaka', 'inactive'),
    new User(1, 'Max', 'Capotte', 'active'),
    new User(2, 'Anna', 'Frank', 'active'),
    new User(3, 'Julio', 'Iglesias', 'active'),
    new User(4, 'Carlitos', 'Bala', 'inactive'),
    new User(5, 'Mariana', 'Venezolana', 'inactive'),
    new User(6, 'Pepe', 'Parada', 'inactive'),
  ];

  usersChanges = new EventEmitter<User>();

  /* u1: User = new User(1, 'Max', 'Capotte', 'active');
  u2: User = new User(2, 'Anna', 'Frank', 'active');
  u3: User = new User(3, 'Julio', 'Iglesias', 'active');

  u4: User = new User(4, 'Carlitos', 'Bala', 'inactive');
  u5: User = new User(5, 'Mariana', 'Venezolana', 'inactive');
  u6: User = new User(6, 'Pepe', 'Parada', 'inactive'); */

  usersActive: User[] = [];

  usersInActive: User[] = [];

  constructor(private counterService: UsersCounterService) {
    this.users.forEach(element => {
      if (element.status === 'active') {
        this.usersActive.push(element);
      } else {
        this.usersInActive.push(element);
      }
    });

    /* this.usersActive.push(this.u1, this.u3, this.u2);
    this.usersInActive.push(this.u4, this.u5, this.u6); */
    // console.log('CANTIDAD DE USUARIOS : ACTIVOS -' + this.usersActive.length + 'INACTIVOS -' + this.usersInActive.length);
  }

  changeStatus(id: number, status: string): void {
    if (status === 'inactive') {
      alert(this.usersActive[id].toString());
      this.usersActive[id].setStatus();
      alert(this.usersActive[id].toString());
      this.usersInActive.push(this.usersActive[id]);
      this.usersActive.splice(id, 1);

      this.counterService.incrementActToInact(status);

    } else {
      alert(this.usersInActive[id].toString());

      this.usersInActive[id].setStatus();
      alert(this.usersInActive[id].toString());
      this.usersActive.push(this.usersInActive[id]);
      this.usersInActive.splice(id, 1);

      this.counterService.incrementActToInact(status);
    }
  }

  /*  for (let index = 0; index < this.usersActive.length; index++) {
     if (this.usersActive[index].id === id) {
       const buscado = this.usersActive[index];
       buscado.status = 'inactive';
       this.usersInActive.push(buscado);
       this.usersActive.splice(id, 1);
     }}
     */
  /*  this.usersActive.forEach(element => {
      if (element.id === id) {
        element.status = 'inactive';
        this.usersInActive.push(element);
        this.usersActive.splice(id, 1);
      }}); 
    */


  getInactiveUsers(): User[] {
    return this.usersInActive;
  }

  getActiveUsers(): User[] {
    return this.usersActive;

    /* this.users.forEach(element => {
      if(element.status === 'active'){
        this.resActive.push(element);
      }
    });
    return this.resActive;*/    
  }

  getUsers(): User[] {
    return this.users.slice();  // devuelve una copia de la matriz
  }

  getOneUser(id: number): User {
    const usu = this.users.find(
      (u) => {
        return u.id === id;
      }
    );
    return usu;
  }

  getUsersStatus(sts: string): any {
    const listUsu: User[] = [];
    this.users.forEach(element => {
      if (element.status === sts) {
        listUsu.push(element);
      }
      return listUsu;
    });

    /* for(let i = 0; i>this.users.length, i++;) {
      if( this.users[i].status === sts){
        listUsu.push(this.users[i]);
      }};return listUsu;  */
  }


}
