import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authServ: AuthGuard) { }

  ngOnInit() {
  }

  onLogin() {
    this.authServ.logIn();
  }
  
  onLogout() {
    this.authServ.logOut();
  }

}
