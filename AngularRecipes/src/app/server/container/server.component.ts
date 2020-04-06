import { Component, OnInit } from '@angular/core';
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
    price: number;
    asistencia = true;
    borrar = 'Fenis';
    loggeadIn = false;
    showTextbutton = false;

    numbers: number[] = [];
    cosas = [{ type: '', name: '', description: '' }];

    servers: { id: number, name: string, status: string }[] = [];
    private servers2: any[] = [];
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
        alert('toAdd');
        this.router.navigate(['list'], {relativeTo: this.route});
    }

}
