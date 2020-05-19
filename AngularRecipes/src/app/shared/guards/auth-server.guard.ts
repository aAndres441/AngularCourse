import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanActivateChild } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServerGuard implements CanActivate, CanActivateChild {

  constructor(private authenticGuard: AuthGuard,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // me comunico con el servicio
    const authenticated = this.authenticGuard.isAuthenicated();

    if (authenticated) {
      return true;
    } else {
      this.router.navigate(['/login']); // si no cumple redirige al home
    }
  }

// si el metodo isAuthenicated() llevara promesa, esto  sigue asi.
  /* canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot)
              : Observable<boolean> | Promise<boolean> | boolean {

    // me comunico con le servicio
    return this.authenticGuard.isAuthenicated()
      .then(
        (authenticated: boolean) => {
          if (authenticated === true) {
            return true;
          } else {
            this.router.navigate(['/']);
          }
        }
      );
  } */

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot)
                    : Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}
