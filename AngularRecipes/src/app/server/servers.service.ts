import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class ServersService {

  private servers = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online'
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline'
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'offline'
    },
    {
      id: 4,
      name: 'Runserver',
      status: 'online'
    }
  ];

  onChanged = new EventEmitter();

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
}
