import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Server } from './server-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServersService {

  

  private servers: Server[] = [
    new Server(11, 'Productionserver', 'online', new Date(Date.now()), 'medium'),
    new Server(12, 'Testserver', 'critical', new Date(Date.now()), 'large'),
    new Server(13, 'Devserver', 'stable', new Date(Date.now()), 'small'),
    new Server(14, 'Runserver', 'offline', new Date(Date.now()), 'medium'),
    new Server(1, 'Max', 'online', new Date(Date.now()), 'medium'),
    new Server(2, 'Anna', 'critical', new Date(Date.now()), 'medium'),
    new Server(3, 'Julio', 'offline', new Date(Date.now()), 'large'),
    new Server(4, 'Carlitos', 'online', new Date(Date.now()), 'large'),
    new Server(5, 'Mariana', 'stable', new Date(Date.now()), 'small'),
    new Server(6, 'Pepe', 'critical', new Date(Date.now()), 'small'),
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
  
  getServers() {
    return this.servers;
  }

  getServer(id: number) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    return server;
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
    this.onChanged.emit(this.servers.slice());
    // this.onChanged2.next(this.servers.slice());
  }

  addServer(newServ: Server) {
    this.servers.push(newServ);
    // this.onChanged.emit(this.servers.slice());
    this.onChanged2.next(this.servers.slice());
  }
}
