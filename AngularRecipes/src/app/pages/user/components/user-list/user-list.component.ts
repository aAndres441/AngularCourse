import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotExpr } from '@angular/compiler';
import { UserServiceSubject } from '../../userServiceSubject';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, from } from 'rxjs';
import { Order } from 'src/app/shared/order/order.model';
import { getLocaleDayPeriods } from '@angular/common';
import { element } from 'protractor';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy, Order {

  allUsers: User[];
  totalFenixPrice = 10;
  temporalAllUsers: User[] = [];
  temporalUser: User;
  lastId = 100;
  private suscripcion: Subscription;


  usu: User;

  idOrder = 0;

  order: Order = {
    numberOrder: 0,
    items: [{
    name: '',
    customer: '',
    details: '',
    date: new Date()
    }]
};

numberOrder: number;
items: [{ name: string; customer: string; details: string; date: Date; }];

orderList: Order[] = [];

 /*  temporalUser2: User = {
    id : 0,
    name: '',
    lastname: '',
    status: '',
    timeStamp: new Date(),
    price: 0,
  }; */
  
  myForm: FormGroup;

  datoRandom1: boolean;
  datoRandom2: boolean;

  constructor(private service: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private userServiceSubject: UserServiceSubject) { }
  


  ngOnInit() {
    
    this.allUsers = this.service.getUsers();

   /*emmiter
     this.service.usersChanges.subscribe(
      (userrs: User[]) => {this.allUsers = userrs; }
    ); */

    this.suscripcion = this.service.onChange
    .subscribe(
      (usu: User[]) => {
        this.allUsers = usu;
      }
    );
     /* form fenix */
    this.myForm = new FormGroup({
      customerName: new FormControl(null, [Validators.required]),
      customerLastName: new FormControl(null, [Validators.required, Validators.maxLength(4)]),
      status: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
    });
  }

/* todo para fenixUsers */
  onAddFenix(usu: User) {
    this.totalFenixPrice = (this.totalFenixPrice + usu.price);
    this.temporalAllUsers.push(usu);
    console.log(this.totalFenixPrice);
  }

  removeeTemp = (usu: User) => {
    const index = this.temporalAllUsers.indexOf(usu);
    if (index > -1 ) {
      this.temporalAllUsers.splice(index, 1);
    }
  }

  onAddOrder() {
    if (this.idOrder < 1) {
      confirm('You must be add order number greater than zero');
    } else {
      const tems: [] = [];
      this.temporalAllUsers.forEach( element => {
        const oneOrder: Order = {
          numberOrder: this.idOrder,
          items: [{
          name: element.name,
          customer: element.lastname,
          details: element.price.toString(),
          date: new Date ()
          }],
        };
        this.orderList.push(oneOrder);
        alert( `--${element.name}-`);/* 
        this.orderList.push(this.order); */
      });
      alert('--' + this.orderList.length + '..');
      this.service.addOrder(this.orderList);
      this.temporalAllUsers.splice(0, this.temporalAllUsers.length);

      this.orderList = [];
      this.idOrder = 0;
    }
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  /* tthis.route.params.subscribe(
      (param: Params) => {
        this.id = +param.id;

        this.editMode = param.id != null;
 */

  delete(dato: number): boolean {
    let res = false;
    /* this.router.navigate([dato],
      { relativeTo: this.route,
        queryParams: { numerEdit: '108' },
        fragment: 'fragmento'
      }); */
    if (this.service.delete(dato)) {
        res = true;
      }
    return res;
  }
  delete2(hero: User): void {
    this.allUsers = this.allUsers.filter(h => h !== hero);
    this.service.delete2(hero).subscribe();
    
  }

  activateEmitter() {
    this.datoRandom1 = (Math.floor(Math.random() * 256) % 2 === 0 ? true : false);  //  Math.random();

    this.userServiceSubject.eveActivatedEmitter.emit(this.datoRandom1);
  }

  activateSubject() {
    this.datoRandom2 = (Math.floor(Math.random() * 256) % 2 === 0 ? true : false);  //  Math.random();

    this.userServiceSubject.subjActivatedSubject.next(this.datoRandom2);
  }

  /* para Form fenix */
  onSubmit() {
    console.log(this.myForm.status + ' STATUS');
    this.lastId++;
    this.temporalUser = new User(this.lastId,
                                this.myForm.controls.customerName.value,
                                this.myForm.controls.customerLastName.value,
                                this.myForm.controls.status.value,
                                this.myForm.controls.quantity.value);

    const data = this.myForm.value;
    // data.totalDelPreio = this.totalFenixPrice;
    console.log(data);

    this.onCreateUsu(this.temporalUser);
    this.myForm.reset();
  }

  onCreateUsu(data: User) {
    this.service.onCreateUsu(data);
  }

  save(): void {
    this.service.update(this.usu)
      .subscribe(() => alert ('eselente')); /* this.goBack()); */
  }

  getUsers2(): User[] {
    alert(`1--${this.allUsers.length}--`);
    this.service.getUsers2()
    .subscribe((usus: User[]) => {
      this.allUsers = usus;
      alert(`2--${this.allUsers.length}--`);
    });
    return this.allUsers;
  }

  changeStatus(usu: User) {
    usu.status = 'stand by';
    this.service.update(usu);
  }

}
