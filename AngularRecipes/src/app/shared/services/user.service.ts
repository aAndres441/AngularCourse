import { Injectable, EventEmitter } from '@angular/core';
import { UsersCounterService } from './users-counter.service';
import { User } from 'src/app/pages/user/user.model';
import { Observable, from, Subject, of, pipe } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

/* firesbase */
import { environment} from '../../../environments/environment';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
/* import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore'; */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../order/order.model';


// tiene injectado otro servicio, UsersCounterService
@Injectable()

export class UserService {
  
  constructor(private counterService: UsersCounterService,
              private readonly afs: AngularFirestore,
              private http: HttpClient) {

    this.users.forEach(element => {
      if (element.status === 'active') {
        this.usersActive.push(element);
      } else {
        this.usersInActive.push(element);
      }
    });

    /* ejemplo tutorial */
   /*  this.usersCollection = afs.collection<User>('users');
    this.users2 = this.usersCollection.snapshotChanges()
      .pipe(map(
        actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )) */
  /* termina ej tutorial */


  }


  /* private users: User[] = new Array<User>(); */
  private users: User[] = [
    new User(11, 'Ale', 'Santana', 'active', 9),
    new User(12, 'Rolo', 'Duarte', 'inactive', 12),
    new User(13, 'Analia', 'Lacalle', 'active', 4),
    new User(14, 'Marcos', 'Kaka', 'inactive', 54),
    new User(1, 'Max', 'Capotte',  'active', 8),
    new User(2, 'Anna', 'Frank',  'active', 21),
    new User(3, 'Julio', 'Iglesias', 'active', 11),
    new User(4, 'Carlitos', 'Bala',  'inactive', 9),
    new User(5, 'Mariana', 'Venezolana',  'inactive', 14),
    new User(6, 'Pepe', 'Parada', 'inactive', 44),
    new User(22, 'Pauli', 'Genaro',  'inactive', 100),
    /* new User(11, 'Ale', 'Santana', 'ale@.com', 'active', 9),
    new User(12, 'Rolo', 'Duarte', 'rolo@.com', 'inactive', 12),
    new User(13, 'Analia', 'Lacalle', 'ana@.com', 'active', 4),
    new User(14, 'Marcos', 'Kaka', 'mar@.com', 'inactive', 54),
    new User(1, 'Max', 'Capotte', 'max@.com', 'active', 8),
    new User(2, 'Anna', 'Frank', 'ann@.com', 'active', 21),
    new User(3, 'Julio', 'Iglesias', 'jul@.com', 'active', 11),
    new User(4, 'Carlitos', 'Bala', 'care@.com', 'inactive', 9),
    new User(5, 'Mariana', 'Venezolana', 'mar@.com', 'inactive', 14),
    new User(6, 'Pepe', 'Parada', 'pep@.com', 'inactive', 44),
    new User(22, 'Pauli', 'Genaro', 'pau@.com', 'inactive', 100), */
  ];

  usersChanges = new EventEmitter<User>();

  usersActive: User[] = [];
  usersInActive: User[] = [];

  onChange = new Subject<User[]>();
  onChangeOrder = new Subject<Order[]>();
/*
  users3: User[] = []; */
  users2: Observable<User[]>;
  private usersCollection: AngularFirestoreCollection<User>;
  orders: Order[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'User/json' })
  };

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
  /** GET heroes from the server */
  getUsers2(): Observable<User[]> {
    const url = `${(environment.firebaseConfig.databaseURL + 'User.json')}`;
    return this.http.get<User[]>(url)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }
 /*  handleError<T>(arg0: string, arg1: undefined[]): (err: any, caught: Observable<User[]>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  } */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getOneUser(id: number): User {
    const usu = this.users.find(
      (u) => {
        return u.id === id;
      }
    );
    return usu;
  }
  /** GET hero by id. Will 404 if id not found */
getUser(id: number): Observable<User> {
  const url = `${(environment.firebaseConfig.databaseURL + 'User.json')}/${id}`;
  return this.http.get<User>(url).pipe(
    tap(_ => console.log(`fetched hero id=${id}`)),
    catchError(this.handleError<User>(`getUser id=${id}`))
  );
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

  onCreateUsu(data: User) { 
     this.http.post(environment.firebaseConfig.databaseURL + 'User.json', data)
      .subscribe(resp => {
      }, () => {
        alert('NO');
     });
     this.users.push(data);
     this.onChange.next(this.users.slice());
  }
//  private cadena = environment.firebaseConfig.databaseURL + 'posts.json';

delete(dato: number): boolean {/* 
  const index = this.tempOrderList.indexOf(usu);
  if (index > -1) { */
    if (this.users.splice(dato, 1)) {
      alert ('SII');
      this.onChange.next(this.users.slice());
      return true;
    }
    alert ('nooo');
    return false;
  }
  /** DELETE: delete the hero from the server */
  delete2(hero: User): Observable<User> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${environment.firebaseConfig.databaseURL + 'User.json'}/${id}`;

  return this.http.delete<User>(url, this.httpOptions).pipe(
    tap(_ => console.log(`deleted hero id=${id}`)),
    catchError(this.handleError<User>('deleteUser'))
  );
}

deleteAll() {
  while (this.users.length) {
    this.users.splice(0, 1);
  }
  this.onChange.next(this.users.slice());
}


  addOrder(tempOrderList: Order[]) {
    this.http.post(environment.firebaseConfig.databaseURL + 'Orders/order.json', tempOrderList)
      .subscribe(resp => {
        /* this.orders = tempOrderList;
        this.onChangeOrder.next(this.orders.slice()); */
      }, () => {
        alert('Error to add Order');
     });

    this.orders = tempOrderList;
    this.onChangeOrder.next(this.orders.slice());
  }

  /** PUT: update the hero on the server */
  updateUser(hero: User): Observable<any> {
    return this.http.put(environment.firebaseConfig.databaseURL + 'User.json', hero, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  update(usu: User): Observable<any>  {
    console.log(usu);

    throw new Error('Method not implemented.');
  }


}
