import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Server } from '../../server-model';

@Component({
  selector: 'app-list-server',
  templateUrl: './list-server.component.html',
  styleUrls: ['./list-server.component.css']
})
export class ListServerComponent implements OnInit {

  server: Server;
  // datoID: number;
  
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

      /* Abajo en on init, Dejo de llamar al servicio drectamente (lo de abajo) porque cambie por resolve
     (lo de arriba) que trae todo el objeto en Data con datos para cargar en la pagina, y uso susbcribe por si cambia
     el servidor mientras estoy en la misma pagina.
     Esto es importante si uso datos asincronicos, sino dejo como abajo usando Params aca directamente.
      */

  ngOnInit() {
    this.route.data.subscribe(
      (dato: Data) => {
        this.server = dato.servResolve;
      }
    );

    /* const unaid = +this.route.snapshot.params.id;
    console.log(this.route.snapshot.queryParams + ' LISTA');
    console.log(this.route.snapshot.fragment);
    this.server = this.serversService.getServer(unaid);

    this.route.params
    .subscribe(
      (param: Params) => {
        this.server = this.serversService.getServer(+param.id);
      }
    );     */


    confirm('this.server.name of on init ListServerComponent');
  }

  onEdit() {
   /* ya que estamos en la ruta Server solo cargamos la ruta relativa  edit ,
   y guardamos datos de url con queryParamsHandling*/

   this.router.navigate(['edit'], {relativeTo: this.route,
       queryParamsHandling: 'preserve'});
  }


}
