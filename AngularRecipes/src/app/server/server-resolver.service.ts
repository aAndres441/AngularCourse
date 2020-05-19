import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from './servers.service';

// esto popdria ser otra clase o interface a parte para no usarlo asi cada vez.
interface Server { id: number; name: string; status: string; date: Date; instanceType: string; }
/*  id = 0;
    name: string;
    status: string;
    date: Date;
    instanceType: string; */

@Injectable({
  providedIn: 'root'
})

export class ServerResolverService implements Resolve<{ id: number, name: string, status: string }> {
  
  constructor(private service: ServersService) { }

  // esto usa la instantanea y devolvera una promesa asincronica,si demora o un server sincronico
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    
    return this.service.getServer(+route.params.id);
  }

  resolveMyNew(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    
    return this.service.getServer(+route.params.id);
  }


  
}
