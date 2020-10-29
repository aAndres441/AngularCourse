import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { resolve } from 'url';
import { UpperCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard   {

  loggeadIn = false;

  /* metodo para simular la demora en una respuesta del servidor, etc,
   por eso devuelve una promesa que siempre tomara otro metodo */

  isAuthenicated(): boolean {
      /* const promise: new Promise (
        (resolve, reject) => {
          setTimeout(() => {
            resolve(this.loggeadIn);
          }, 800);
        }
      );
      return promise; */

    setTimeout(() => {
      this.loggeadIn = true;
    }, 6000);

    alert('Logging time changes after 6 seconds in AuthGuard, now is: ' + this.loggeadIn);

    return this.loggeadIn;

  }

  logIn() {
   return this.loggeadIn = true;
  }

  logInEmail() {
    this.loggeadIn = false;
  }
  logInGoogle() {
    this.loggeadIn = false;
  }
  logInFacebook() {
    this.loggeadIn = false;
  }

  logOut() {
    this.loggeadIn = false;
  }
}
