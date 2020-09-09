import { Injectable, EventEmitter } from '@angular/core';
import { ActivationStart, provideRoutes } from '@angular/router';
import { ViewAccountService } from './viewAccount.service';
import { Account } from 'src/app/pages/account/account.Model';
import { Subject } from 'rxjs';

/* import { OldAccountService } from './oldAccount.service'; */


@Injectable({
  providedIn: 'root'
}

)
export class AccountService {

  private accounts: Account[] =  [
    {
      id: 10,
      name: 'Julito',
      status: 'active'
    },
    {
      id: 1,
      name: 'Mariana',
      status: 'inactive'
    },
    {
      id: 2,
      name: 'Feliciano',
      status: 'unknown'
    },
  ];

  notifyStatusUpdate = new EventEmitter<Account[]>();
  notifyStatusUpdate2 = new EventEmitter<Account>();

  onChangeAcounts = new Subject<Account[]>();
  onChangeAcou = new Subject<Account>();

  /* informa el estado nuevo,al llamarlo desde el metodo donde usa este servicio,ej add count */

  constructor() { }/* private oldServicio: OldAccountService */

  /* onAccountAdded(newAccount: { name: string, status: string }) {
    this.accounts.push(newAccount); */
  addAccount( id: number, name: string, status: string ) {
    this.accounts.push({id, name, status});
    this.avisar(name, status);
    /* this.oldServicio.mostrateDato(status); */
    this.notifyStatusUpdate.emit(this.accounts.slice());
    // this.onChangeAcounts.next(this.accounts);
  }

  /* onStatusChanged(updateInfo: { id: number, newStatus: string }) {
    this.accounts[updateInfo.id].status = updateInfo.newStatus; */
  updateStatus(id: number, statuss: string ) {
   //  alert(this.accounts[id].name + '...'+ this.accounts[id].status)
  this.accounts[id].status = statuss;
  this.avisar(this.accounts[id].name + '', statuss);
  /* this.oldServicio.mostrateDato(status); */

  /* para subject pero  no anda */
  this.onChangeAcou.next(this.accounts[id]);
  this.onChangeAcounts.next(this.accounts);

  /* para emit */ 
  /* this.notifyStatusUpdate2.emit(this.accounts[id]); */
  
}

  avisar(dato1: string, dato2: string) {
    console.log('correct transaction!  Data: ' + dato1 + '-' + dato2);
    alert('correct transaction!  Data: ' + dato1 + '-' + dato2);
  
  }

  getAccounts() {
    return this.accounts;
  }
}
