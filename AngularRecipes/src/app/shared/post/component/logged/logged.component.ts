import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
/* Para autenticar */
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app/';
/* import * as firebase from 'firebase';  */
import {AngularFireStorage } from '@angular/fire/storage';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/post.service';
import { Image } from '../image.model';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'; // para .
import { Post } from '../../post.model';

// import  * as reusable  from '../../../shared.module';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {

  @ViewChild('desdeHtml') datoHtml: ElementRef; // variable desde html

  @ViewChild('imagUrl') imagUser: ElementRef; // variable desde html que uso para mostrar al agregar usuario

  imgen = '';  // para ver el usuario logueado
  imagenI: Image;
  title = '';
  uploadPercent: Observable<number>;
  imgUrl: Observable<string>; // sera Url de la imagen subida al storage

  imgParaLoad: any;
  imgParaLoadnombre = '';
  imgTimeStamp = '';
  // o lo mismo pues imporatamos * y auth
/* google */

 // providerGoogle = new firebase.auth.GoogleAuthProvider();
 providerGoogle2 = new auth.GoogleAuthProvider();
/* Facebook */

// providerFace = new firebase.auth.FacebookAuthProvider();
// providerFace2 = new auth.FacebookAuthProvider();

  base = '';
  age = 0;
  public userName = '';
  gender = '';
  password = '';
  email = '';
// Get a reference to the database service
// const databaseTutorial = firebase.database();

  constructor(private router: Router,
              private service: PostService,
              private authServ: AuthGuard,
              public afAuth: AngularFireAuth,
              public storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  onLoginGoogle(): void  {
   // con la variable provider de google en el popup
  /*   this.afAuth.signInWithPopup(this.providerGoogle)
      .then ((res) => {
        console.log('promesa se ejecuta cuando se resuelve lo anterior ' + res.user.email);
        this.router.navigate(['/payment']);
      }); */

     /* this.afAuth.signInWithPopup(new auth.GoogleAuthProvider ()) */
     this.service.onLogingoogle() // le puse esto hacia servicio pero sirve el de arriba
      .then((res) => {
        console.log('Promesa desde Google ' + res.user.displayName + 'Img ' + res.user.photoURL);
        this.imgen = res.user.photoURL;
        // this.router.navigate(['users/list']);
      }).catch(err => {console.log(err + ' Error'), alert(err + ' Error => al Login');
                      // this.onLogin();
                       this.router.navigate(['/login']);
      });
  }

  onLogin() {
    this.authServ.logIn();  // esto es del guardia
  }

  onLoginFace(): void  {
   /*  this.afAuth.signInWithPopup(new auth.FacebookAuthProvider()) */
   this.service.onLoginFace()
    .then ( (res) => {
      console.log('Promesa desde face ' + res.user.displayName);
      alert('Promesa desde face ' + res.user.displayName);
    }).catch(err => console.log(err)
    );
  }

  onLogoutGoogle() {
    // this.afAuth.signOut();
    // o
    this.service.onLogoutUser();
  }
  onLogout() {
    /* this.service.onLogoutUser() */
  }
  onLogoutFace() {
    alert('RANDOM ' + Math.random().toString(36).substring(2));
    this.afAuth.signOut();
  }

  /* Carga imagen en el Storage */
  onLoadImg(event: any) {
     /* solo usare del parametro event en console, el target,
     de aca el files y el que esta en primer lugar que es su nombre */

    console.log('sube ' , event.target.files[0], 'Todo ' , event);
    this.imgParaLoad = event.target.files[0];
    this.imgParaLoadnombre = event.target.files[0].name;
    this.imgTimeStamp = event.timeStamp;
    console.log('timeStamp ' , event.timeStamp);

    const idAleatorio = Math.random().toString(36).substring(2);

    const file = event.target.files[0]; // el mismo elemento imagen
    const filePath = `uploads/profileId_${idAleatorio}`; // crea una carpeta y sera la ruta
    const refStorage = this.storage.ref(filePath); // referencia

    const task = this.storage.upload(filePath, file); // con esto sube la imagen con su ruta y la imagen

    /* guarda el porcentaje de subida */
    this.uploadPercent = task.percentageChanges();

    /* aca obtenemos la ruta de la imagen */
    task.snapshotChanges()
      .pipe(finalize(() => {
        this.imgUrl = refStorage.getDownloadURL();
      }))
      .subscribe();

    alert('Subiendo ' + this.imgParaLoadnombre + '..' + this.imgParaLoad + ' time: ' + this.imgTimeStamp);

    this.service.uploadImag(this.imgParaLoad);
    // this.service.uploadImag2(event);
  }

  /* registra ususrio y su imagen mas arriba */
  registerUser() {
    alert('Cargar Image URL : ' + this.imgUrl);
    this.service.registerUser(this.userName, this.password)
      .then((res) => {
        this.service.isAuth().subscribe( usu => {
          if (usu) {
            console.log('usu actual ' + usu);

            usu.prototype({  // creo que sera este function dice updateProfile
              displayName: '',
              photoURL: this.imagUser.nativeElement.value,
            }).then( () => {console.log('usuer Update!');
            /* this.router.navigate(['./recipe']); */
            }).catch(error => {console.log('erreo', error);
          });
          }
        });
        /* this.router.navigate(['./recipe']); */
      }). catch (err => console.log('err', err.message));
  }

  buscarRestaurant(title: string) {
    // invento todo esto
    const query = `SELECT * FROM POSTS WHERE title LIKE${title}LIMIT 10`;
    const res = () => {
      this.service.getCat(query);
    };
    this.title = res[0].substr(1, 5);
 }

 /*  $("#btnMostrar").show();
  $("#panelLog").hide(); */

  btnVerDato(usuName: string, usuPass: string, usuEmail: string, usuGender: string ) {

    this.base = this.datoHtml.nativeElement.value; // toma el valor del campo en html
    alert(`datos de html${this.base}`);

    this.userName = usuName;
    this.password = usuPass;
    this.email = usuEmail;
    this.gender = usuGender;

    // tslint:disable-next-line: max-line-length
    // console.log(` Datos Name: ${this.userName}.gender. ${this.gender}.base. ${this.base} Password: ${this.password} Email: ${this.email}`);
    // tslint:disable-next-line: max-line-length
    alert (` Datos del Usuario: Name. ${this.userName}.gender. ${this.gender}.base. ${this.base} Password: ${this.password} Email: ${this.email}`);
  }

  reset() {
    this.datoHtml.nativeElement.value = '';
    this.imagUser.nativeElement.value = '';
  }

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

   /* $("#panelLog").hide();
    $("#btnMostrar").show(); */
/*
  $("#btnMostrar").click(function () {
    $("#panelLog").show();
    $("#btnMostrar").hide();
  }); */

  // escribir Base de Datos
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
  console.log(service.config);    // ---> Object {apiKey: "some-api-key",
  authDomain: "myapp.firebaseapp.com", databaseURL: "https://myapp.firebaseio.com", storageBucket: "project-somenumber.appspot.com"}
  firebase.initializeApp(service.config);
  console.log(firebase);  // ---> Object {SDK_VERSION: "3.0.5", INTERNAL: Object}
  service.rootRef = firebase.database().ref(); //new Firebase("https://rsb2.firebaseio.com"); --->
  I am getting error on this line "TypeError: firebase.database is not a function"
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

changeName(event: Event) {   // solo para mostrar el input del htmml
  this.title = (event.target as HTMLInputElement).value;
}

  onUserName(event: string) {
    this.userName = event;
    alert('userName2 ' + this.userName);
  }
  onEmail(event: string) {
    this.email = event;
    alert('email2 ' + this.email);
  }

}

