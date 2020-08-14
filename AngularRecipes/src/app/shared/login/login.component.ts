import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
/* Para autenticar */
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* constructor(private router: Router,
              private authServ: AuthGuard,
              public afAuth: AngularFireAuth) { } */

  constructor(private router: Router,
              private authServ: AuthGuard,
              public afAuth: AngularFireAuth
             ) { }

  ngOnInit() {
  }

  onLogingGoogle() {
   
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider ());
    this.router.navigate(['/test']);
  }

  onLogin() {
    this.authServ.logIn();
  }

  onLogoutGoogle() {
    // this.afAuth;
  }
  
  onLogout() {
    this.authServ.logOut();
  }

}
