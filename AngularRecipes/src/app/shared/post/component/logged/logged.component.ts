import { Component, OnInit } from '@angular/core';
/* Para autenticar */
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {

  
/* const provider = new firebase.auth.GoogleAuthProvider();
const base = "";
const name = "";
const age = 0;
const gender = "";
const dudas = "";
const email = ""; */
// Get a reference to the database service
// const databaseTutorial = firebase.database();

  constructor(private router: Router,
              private authServ: AuthGuard,
              public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
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


 /*  $("#btnMostrar").show();
  $("#panelLog").hide(); */


  //$("#btnLogin").click(function () {

    /**//* firebase.auth() */  // se autentica y llamo login con firebase, 
     // .signInWithPopup(provider)  // levanta ventana popUp de provider de google
     // .then(function (result) {  // cuando trae el permiso, resuelve cuando ejecuta el login con identificado el usu y muestro
     /*    console.log(result.user);
        $("#root2").html("My name" + result.user.displayName +
          " Photo: " + "<img src='" + result.user.photoURL + "'/>"
          + "Mi mail : " + result.user.email);
        $("#email").html(result.user.email);
      });
 */

    //aca  muestra inputs y arriba data de BD
   /*  $("#root").append(
      "Nombre: " + $("#btnNombre").val() +
      " Sexo: " + $("#slcSexo").val() +
      " Det: " + $("#txtDetalle").val() +
      " Edad: " + $("#txtAge").val() +
      " Email: " + $("#txtEmail").val() + "|"
    );

    console.log("datos Sexo: " + $("#slcSexo").val() + " Edad: " + age + " Email: " + email)

    $("#panelLog").hide();
    $("#btnMostrar").show(); */

    //le agrego datos a las letiables desde los inputs
   /*  name = $("#btnNombre").val();
    age = $("#txtAge").val();
    gender = $("#slcSexo").val();
    email = $("#txtEmail").val(); */
    //email=document.getElementById("txtEmail");
   /*  dudas = $("#txtDetalle").val();
  }); */
/* 
  $("#btnMostrar").click(function () {
    $("#panelLog").show();
    $("#btnMostrar").hide();
  }); */

  //escribir Base de Datos
/*   $("#btnGuardar").click(function () {
    if ($("#btnNombre").val() === "" || $("#txtAge").val() === "") {
      alert("must be completed");
    } else {
      let nom = $("#btnNombre").val();
      let eda = $("#txtAge").val();
      let sx = $("#slcSexo").val();
      //let id = firebase.database.;
      let key = firebase.database().ref("Tutorial").push().getKey();
      alert(" el ID es: " + key);
      firebase.database().ref("Tutorial")
        /* es tabla no relcional sin Id, 
      sin PK, es un objeto , asi se guarda firebaser en la rama o sea Harcodeo*/
       /*  .push({
          nombre: nom,
          edad: eda, //edad:"14",
          sexo: sx
        })
    }
  }); */

 /*  firebase.auth().onAuthStateChanged(function (user) {
    if (user) { */
      // User is signed in.
    /*   let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData; */
      // ...
   /*  } else { */
      // User is signed out.
      // ...
 /*    }
  }); */

  // Initialize Firebase
  /*this.config = {
      apiKey: "some-api-key",
      authDomain: "myapp.firebaseapp.com",
      databaseURL: "https://myapp.firebaseio.com",
      storageBucket: "project-somenumber.appspot.com",
  };*/


/* this.authWithOAuthPopup = function (type) {
  let deferred = $q.defer();
  console.log(service.config);    // ---> Object {apiKey: "some-api-key", authDomain: "myapp.firebaseapp.com", databaseURL: "https://myapp.firebaseio.com", storageBucket: "project-somenumber.appspot.com"}
  firebase.initializeApp(service.config);
  console.log(firebase);  // ---> Object {SDK_VERSION: "3.0.5", INTERNAL: Object}
  service.rootRef = firebase.database().ref(); //new Firebase("https://rsb2.firebaseio.com"); ---> I am getting error on this line "TypeError: firebase.database is not a function"
  service.rootRef.authWithOAuthPopup(type, function (error, authData) {
    if (error) {
      service.authError = error;
      switch (error.code) {
        case "INVALID_EMAIL":
          console.log("The specified user account email is invalid.");
          break;
        case "INVALID_PASSWORD":
          console.log("The specified user account password is incorrect.");
          break;
        case "INVALID_USER":
          console.log("The specified user account does not exist.");
          break;
        default:
          console.log("Error logging user in:", error);
      }
      deferred.resolve(service.authError);
    } else {
      service.authData = authData;
      console.log("Authenticated successfully with payload:", authData);
      deferred.resolve(service.authData);
    }
    return deferred.promise;
  });
  return deferred.promise;
}

  let service = this;
 */
}
