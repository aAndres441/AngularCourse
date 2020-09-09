import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { OldAccountService } from 'src/app/shared/services/oldAccount.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { ViewAccountService } from 'src/app/shared/services/viewAccount.service';
import { NewAccountComponent } from '../new-account/new-account.component';
import { Subscription } from 'rxjs';
import { Account } from '../../account.Model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],

  /* providers: [OldAccountService] */ /* AccountService no va mas */


})
export class MyAccountComponent implements OnInit, OnDestroy {

  @Input() account: {id: number,  name: string, status: string };
  @Input() id: number;
  private postAccount: Subscription;
  unaAccount: Account;


/*   @Output() statusChanged = new EventEmitter<{ id: number, newStatus: string }>();
 */
  constructor( private servicio: AccountService) { }

  ngOnInit() {
    this.postAccount = this.servicio.onChangeAcou
    .subscribe((pp) => {
      this.unaAccount = pp;
    });
   // alert(this.unaAccount.name + ' es el name ');
  }

  onSetStatus(newStatus: string) {
      /*Despues de tener el servicio injectado, con su provider
      sacamos este evento y su output:*/
      /* this.statusChanged.emit({ id: this.id, newStatus: newStatus }); */

    this.servicio.updateStatus(this.id, newStatus);
        /* aca usamos el servicio correctamente 
        this.elServicio.mostrateDato(newStatus); */

        /* this.servicio.notifyStatusUpdate.emit(newStatus); */
        /* escucha el evento y se suscribe al evento, evento recibe una cadena string y luego lanza en este caso un alert */
    this.servicio.notifyStatusUpdate2.subscribe(
      (unStatus: string) =>
         // this.account.status = unStatus,
         alert('status From my account: ' + this.account.status + '..'),
         console.log('status From my account: ' + this.account.status + '..')
     );
  }
  ngOnDestroy() {
    this.postAccount.unsubscribe();
  }

}
