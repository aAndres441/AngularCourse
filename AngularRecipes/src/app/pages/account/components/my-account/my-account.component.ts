import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { OldAccountService } from 'src/app/shared/services/oldAccount.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { ViewAccountService } from 'src/app/shared/services/viewAccount.service';
import { NewAccountComponent } from '../new-account/new-account.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],

  /* providers: [OldAccountService] */ /* AccountService no va mas */


})
export class MyAccountComponent implements OnInit {

  @Input() account: { name: string, status: string };
  @Input() id: number;

/*   @Output() statusChanged = new EventEmitter<{ id: number, newStatus: string }>();
 */
  constructor( private servicio: AccountService) { }

  ngOnInit() {
  }

  onSetStatus(newStatus: string) {
      /*Despues de tener el servicio injectado, con su provider
      sacamos este evento y su output:*/
      /* this.statusChanged.emit({ id: this.id, newStatus: newStatus }); */

    this.servicio.updateStatus(this.id, newStatus);
        /* aca usamos el servicio correctamente 
        this.elServicio.mostrateDato(newStatus); */

        /* this.infoServicio.informar(newStatus); */

        /* this.servicio.notifyStatusUpdate.emit(newStatus); */
        /* escucha el evento y se suscribe al evento, evento recibe una cadena string y luego lanza en este caso un alert */
    this.servicio.notifyStatusUpdate.subscribe(
      (unStatus: string) => alert('status From my account: ' + unStatus)
    );

  }

}
