import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServersService } from '../servers.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Server } from '../server-model';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    /* template: '<app-footer></app-footer>', */
    styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

    title = 'Componentes para back-end';
    serverId: number = -1;
    serverStatus = 'off line';
    allowNewServer = false;
    textButton = 'Boton Desactivado';
    name: string = '';
    price = 0;
    asistencia = true;
    borrar = 'Fenis';
    loggeadIn = false;
    showTextbutton = false;

    filterStatus = '';
    editMode = false;

    /* referencia local que podria ser el mismo compnente */ 
    @ViewChild('slider', { static: true }) unValor: ElementRef;

    numbers: number[] = [];
    cosas = [{ type: '', name: '', description: '' }];

    servers: { id: number, name: string, status: string }[] = [];
    servers2: any[] = [];
    servers3: Server[] = [];

    private customers: any[] = [
        { name: 'Bottom-Dollar Marketse', city: 'Tsawassen' },
        { name: 'Alfreds Futterkiste', city: 'Berlin' },
        { name: 'Bon app', city: 'Marseille' }
    ];

    constructor(private serversService: ServersService,
                private router: Router,
                private route: ActivatedRoute) {

        this.serverId = 1;
        setTimeout(() => {
            this.allowNewServer = true;
            this.textButton = 'Haga Click';
        }, 3000);
    }

    ngOnInit() {
        this.servers = this.serversService.getServers();

        this.editMode = this.servers != null;
      }

    getServerStatus() {
        return this.serverStatus;
    }
    getallowNewServer() {
        return this.allowNewServer;
    }
    allow(): void {
        this.allowNewServer = !this.allowNewServer;
        this.serverId = 5;
        setTimeout(() => {
            this.allowNewServer = true;
            this.textButton = 'Haga Click';
            this.serverId = 25;
        }, 3000);
    }

    activate() {
        if (this.textButton === 'Boton Activado') {
            this.textButton = 'Boton No Activado';
            this.serverId += 1;
        } else { this.textButton = 'Boton Activado'; }
      /*   console.log(this.textButton); */
        this.showTextbutton = !this.showTextbutton;
    }
   
    onLoadServer(date: number){
        this.router.navigate(['/server', date, 'edit'], /* , 'edit' */
        {queryParams: {algo: '77'}, //allowEditee: 'si'
        fragment: 'loading'}
        );
        this.serverId = date;
    }

   /*  alEdit() {
        this.router.navigate(['/server', 4, 'edit'],
        {queryParams: {algo: '22'},
        fragment: 'loading'}
        );
    } */

    toAdd() {
        if (!this.editMode) {
            this.router.navigate(['error'],
                { relativeTo: this.route });
        } else {
            this.router.navigate(['new'],
                {
                    relativeTo: this.route,
                    queryParamsHandling: 'preserve'
                });
        }
        this.serversService.addServer( new Server(22, 'Olo', 'online', new Date(Date.now()), 'medium'));
    }
        

    getStatusClass(serv: Server) {
        return{
            'list-group-item-success': serv.status === 'online',
            'list-group-item-warning': serv.status === 'offline',
            'list-group-item-default': serv.status === 'stable',
            'list-group-item-danger': serv.status === 'critical',
        };
    }
    changePrice(event: Event) {
        this.price = Number((event.target as HTMLInputElement).value); // (<HTMLInputElement>event.target).value   
        // this.price2 = this.unValor.nativeElement.value; 
      }
}
