import { Component, OnInit } from '@angular/core';
import { Account } from '../../account.Model';
import { AccountService } from 'src/app/shared/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],

  /* providers: [AccountService]  la sacamos da eca y la ponemos en app*/
})

export class AccountComponent implements OnInit {

  prueba = false;

  /* LAS CUENTAS ESTAN EN EL SERVICIO , TAMPOCO USO LOS METODOS ACA */
/*   accounts = [
    { name: 'Master',
      status: 'active'},
    { name: 'King',
      status: 'unknown'},
    { name: 'Queen',
      status: 'inactive'}
  ]; */

  /* accounts: (name: string, status: string) => Account[]; */
  accounts: Account[];

  /* pos: number; */

  constructor(private servicio: AccountService,
              private router: Router) { }

  ngOnInit() {
    /* cargo las cuentas desde el servodor, acordarse del provider */
    this.accounts = this.servicio.getAccounts();    
  }

 /*  onAccountAdded(newAccount: { name: string, status: string }) {
    this.accounts.push(newAccount);
  } */

  /* onStatusChanged(updateInfo: { id: number, newStatus: string }) {
    this.accounts[updateInfo.id].status = updateInfo.newStatus;
    this.pos = updateInfo.id;
    
    console.log('[' + this.pos + ']' + this.accounts[this.pos].status + '---' + this.accounts[this.pos].name);
  } */
  loEdito(){
    this.router.navigate(['/account', 'id'],
    {queryParams: {loEdito: 'si'},
    fragment: 'loading'}
    );
  }
  

}
