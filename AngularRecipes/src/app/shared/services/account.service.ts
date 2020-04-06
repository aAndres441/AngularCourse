import { Injectable, EventEmitter } from '@angular/core';
import { ActivationStart, provideRoutes } from '@angular/router';
import { ViewAccountService } from './viewAccount.service';
import { Account } from 'src/app/pages/account/account.Model';

/* import { OldAccountService } from './oldAccount.service'; */


@Injectable({
  providedIn: 'root'
}

)
export class AccountService {

  constructor() { }/* private oldServicio: OldAccountService */

  private accounts: Account[] =  [
    {
      name: 'Julito',
      status: 'active'
    },
    {
      name: 'Mariana',
      status: 'inactive'
    },
    {
      name: 'Feliciano',
      status: 'unknown'
    },
  ];

  notifyStatusUpdate = new EventEmitter<Account[]>();

  /* informa el estado nuevo,al llamarlo desde el metodo donde usa este servicio,ej add count */

  /* onAccountAdded(newAccount: { name: string, status: string }) {
    this.accounts.push(newAccount); */
  addAccount(name: string, status: string ) {
    this.accounts.push({name, status});
    this.avisar(name, status);
    /* this.oldServicio.mostrateDato(status); */
    /* this.notifyStatusUpdate.emit(this.accounts.slice()); */
  }

  /* onStatusChanged(updateInfo: { id: number, newStatus: string }) {
    this.accounts[updateInfo.id].status = updateInfo.newStatus; */
  updateStatus(id: number, statuss: string ) {
  this.accounts[id].status = statuss;
  this.avisar(this.accounts[id].name + '', statuss);
  /* this.oldServicio.mostrateDato(status); */
}

  avisar(dato1: string, dato2: string) {
    console.log('correct transaction!  Data: ' + dato1 + '-' + dato2);
    alert('correct transaction!  Data: ' + dato1 + '-' + dato2);
  }

  getAccounts(){
    return this.accounts;
  }
}
