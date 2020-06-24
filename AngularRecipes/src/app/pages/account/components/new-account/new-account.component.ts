import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import {ServicioMalo} from '../../../../shared/services/serviceMalUsado.service';
import { OldAccountService } from 'src/app/shared/services/oldAccount.service';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  /* styleUrls: ['./new-account.component.css'], */
  /* Anulo lo de arriba para tener un estilo propio pero en linea (lo llamamos asi), no en el css */
  styles: ['.miEstilo {color: violet; font-size:20px; background-color:rgb(192, 247, 170);}'],
 
  /* providers: [OldAccountService] */ /* AccountService no va mas */
})
export class NewAccountComponent implements OnInit {

  /* @Output() accountAdded = new EventEmitter<{name: string, status: string}>(); */
 
 /*  @Input() id: number; */
  isBackground = false;
  
  constructor( private servicio: AccountService) {

    /* escucha el evento y se suscribe al evento, evento recibe una cadena string y luego lanza en este caso un alert */
    this.servicio.notifyStatusUpdate.subscribe(
      (unStatus: string) => alert('New status is: ' + unStatus)
      );
   }

  ngOnInit() {
  }

onCreateAccount( id: number, accoutName: string, accountStatus: string) {

  this.servicio.addAccount(id, accoutName, accountStatus );

  /*Despues de tener el servicio injectado, con su provider
  sacamos este evento y su output:

   this.accountAdded.emit({
    name: accoutName,
    status: accountStatus
  }); */
  /*servicio prueba 1 */
 /*  alert('A server status changed, new status = ' +  accountStatus +
  ' Nombre: ' + accoutName); */

  /*servicio prueba 1 */
 /*  const servicioMal = new ServicioMalo();
  servicioMal.metodoMostrar(accountStatus); */

  /*servicio prueba 3 */
  /* aca usamos el servicio corectamente 
  this.elServicio.mostrateDato(accountStatus);*/

}



}
