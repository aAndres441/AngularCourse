import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../servers.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate{  

  // implementa esta interface CanComponentDeactivate, con metodo canDeactivate(), para avisar si queremos dejar ruta.

  server: {id: number, name: string, status: string};
  serverName: string = '';
  serverStatus = '';
  servId: number;
  fenix: any;
  allowEdit = false;
  changesSaved = false; // para saber si quiero abandonar url.

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }
              // acordarse injectar aca el Router que es para la navegacion

  ngOnInit() {

    // 1-accedo a parametros con snapshot, pero estos se actualizan en el momento que se crea este componente
    // por lo tanto si trabajamos sin cambiar de pag, no se  actualizaran datos.
    
    console.log(this.route.snapshot.queryParams + ' y');
    console.log(this.route.snapshot.fragment);
    
    // 2- accedo a parametros y los suscribo como observables     
    this.route.queryParams
    .subscribe(
      (queryPa: Params) => {

        // invento esto, que no va  ////////////////////
        if(queryPa.algo=== '77') {confirm('oooo'); }
// //////////////////////////////////////////////////////

        this.allowEdit = queryPa.allowEditee === 'si' ? true : false ;
        /* es del comp server: [queryParams]="{forEdit: serv.id === 2 ? 'si' : 'no'}" 
        si es SI entonces allowE cambia a true */
      }
    );

    this.route.fragment.subscribe();
    
    const numero = +this.route.snapshot.params.id;
    this.server = this.serversService.getServer(numero);

    // TRABAJO
    // suscribe y avisa a los params de la ruta si cambian los parametros
    /*  */
       
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.servId = this.server.id;
  }

  /*  muestro este servidor con params en url */
  onUpdateServer() {
    this.serversService.updateServer(this.server.id,
      {
        name: this.serverName,
        status: this.serverStatus
      });
      
    this.changesSaved = true;
    
    this.server = this.serversService.getServer(this.server.id);
    alert('nombre edit ' +  this.server.name);
    
    this.route.params
    .subscribe(
      (param: Params) => {
        this.server = this.serversService.getServer(+param.id);
      }
    );

    // sube un nivel para el ultimo cargado con relacion a esta ruta, debo inyectar Ruter , ../
    this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'preserve'} );

  }

  alListado() {
    this.router.navigate(['/server'],
      {
        queryParams: { algo: 'listados' },
        fragment: 'loading'
      }
    );
  }

  confirm(){
    confirm('Save changes OK');
    alert('confirm()');
  }

  // metodo guard que verifica si sale sin aviso
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    /* ESTA LOGICA SE EJECUTARA SIEMPRE QUE EL ENRUTADOR COMPRUEBE A CanDeactivateGuard */
    if (!this.allowEdit) {
      return true; // si permite allowEdit editar , entonces puede salir
    }   
    /* 
     si nuevo nombre (que viene de la properyBind [(ngModel)]="serverName") es != al que tenia ....
     o es falso changeSaved 
     */
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes ?');  // dialogo confirm
    } else {
       confirm('Save changes OK desde canDeactivate');
       return true; // se guardo salvado
    }
  }
}

/* Metodo de busqueda
  const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  } */

  /* Actualiza params. etc
  
  /* this.servicioRecipe.recipeSelected
    .subscribe(
      (oneRecipe: Recipe) => {
        this.recipeWasSelected = oneRecipe;
      } */
      /* this.route.params
    .subscribe(
      (param: Params) => {
        this.server = this.serversService.getServer(+param.id);
      }
    );     */
    /*  this.servicioRecipe.recipesChanged
    .subscribe(
      (recips: Recipe []) => {
      this.recipes = recips; }
    ); 
    
   /*  this.route.queryParams
    .subscribe(
      (queryPa: Params) => {
        this.allowEdit = queryPa.allowEditee === 'si' ? true : false ;
      }
    ); */
