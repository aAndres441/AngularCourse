import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Server } from './server-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServersService {

  

  private servers: Server[] = [
    new Server(0, 'Productionserver', 'online', new Date(Date.now()), 'medium'),
    new Server(1, 'Testserver', 'critical', new Date(Date.now()), 'large'),
    new Server(2, 'Devserver', 'stable', new Date(Date.now()), 'small'),
    new Server(3, 'Runserver', 'offline', new Date(Date.now()), 'medium'),
    new Server(4, 'Max', 'online', new Date(Date.now()), 'medium'),
    new Server(5, 'Anna', 'critical', new Date(Date.now()), 'medium'),
    new Server(6, 'Julio', 'offline', new Date(Date.now()), 'large'),
    new Server(7, 'Carlitos', 'online', new Date(Date.now()), 'large'),
    new Server(8, 'Mariana', 'stable', new Date(Date.now()), 'small'),
    new Server(9, 'Pepe', 'critical', new Date(Date.now()), 'small'),
  ];

  private servers2 = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online',
      date: '12,12,2010'
    },
  ];

  onChanged = new EventEmitter<Server[]>();
  onChanged2 = new Subject<Server[]>();

  constructor() { }
  
  getServers(): Server[] {
    /* return this.servers; */
    return this.servers.slice();
  }

  getServer (id: number): Server {
    return this.servers.slice()[id];
    /* const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    return server; */
  }

  /* getServer(id: number) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    if ( server) {
      return server;
    }
    return null;
  } */

  updateServer(id: number, serverInfo: {name: string, status: string}) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
    alert('nombre servicio que actualizo ' +  this.getServer(server.id).name);
  }

  updateServer2(id: number, serv: Server) {
    this.servers[id] = serv;
   // this.onChanged.emit(this.servers.slice());
    this.onChanged2.next(this.servers.slice());
  }

  addServer(newServ: Server) {
    this.servers.push(newServ);
    // this.onChanged.emit(this.servers.slice());
    this.onChanged2.next(this.servers.slice());
  }

  deleteServer(index: number) {
    this.servers.splice(index, 1); // elimino y abajo llamo a las actulizadas
    this.onChanged2.next(this.servers.slice());
  }

  deleteAllRecipes(){
    while (this.servers.length) {
      this.servers.splice(0, 1);
    }    
    this.onChanged2.next(this.servers.slice());
  }

}
