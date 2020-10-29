import { Injectable } from '@angular/core';
import { Post } from '../../shared/post/post.model';
import { Subject, Observable, of, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap, catchError, finalize } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { auth } from 'firebase/app/';
import * as firebase from 'firebase';
import 'firebase/database';
import { Image } from '../post/component/image.model';
import { User } from 'src/app/pages/user/user.model';
import { Key } from 'protractor';

/*
import { promise } from 'protractor';
import { resolve } from 'path';
import { rejects } from 'assert';
import { runInThisContext } from 'vm'; */

@Injectable({providedIn: 'root'})
      /* {providedIn: 'root'} no seria necesario en root si lo usara solo para una cosa*/

   export class PostService {

  /* para ej tutorial */
  private loadedPosts: Post[] = [];
  private postCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;

  /* taodo para image */
  private MEDIA_STORAGE_PATH = 'imagenesUdemy'; // Para crear una carpeta en firebase con ese nombre
  private acceptType = ['image/jpg', 'image/png'];
  imageLista: Image[] = [];
  downloadUrl: string;
  private porcentage: Observable<number>;
  onChangeImage = new Subject<Image[]>();

  private posts2: Post[] = [];
  /* private posts2: Post[] = [
    new Post ( 100, 'Jorge', 'Caminante', 'https://tse3.mm.bing.net/th?id=OIP.0F55zIrLRsqZHae9hGlwSAHaEJ&pid=Api&P=0&w=304&h=171'),
    new Post ( 101, 'Clock', 'In two binding', 'https://tse3.mm.bing.net/th?id=OIP.WwiZsucIqy6R4taHgUJ2CQHaHa&pid=Api&P=0&w=300&h=300'),
    new Post ( 102, 'Lemur', 'In my mind', 'https://tse1.mm.bing.net/th?id=OIP.hNOV7KRYdK93MsE6SXHMVQHaLH&pid=Api&P=0&w=300&h=300')
  ]; */

  onChange = new Subject<Post[]>();
  IncrementalChange = new Subject<number>();
  randomSub = new Subject<boolean>();
  viewPost = new Subject<Post>();
  logeado = new Subject<boolean>();

  userLogueadoID: string;
  userLogueadoName: string;
  userLogueadoEmail: string;
  userLogueadoURL = '';
  userLogueadoPhoto = '';

  private cadena = environment.firebaseConfig.databaseURL + 'Posts.json';
  private cadena2 = `${environment.firebaseConfig.databaseURL}Jugadores.json`;
  private cadena3 = `${environment.firebaseConfig.databaseURL}User.json`;

  private provideGoogle = new auth.GoogleAuthProvider();
  private provideFace = new auth.FacebookAuthProvider();

  public db = firebase.firestore();
    // Get a reference to the storage service, which is used to create references in your storage bucket
  storageGetReference = firebase.storage();
    // Create a storage reference from our storage service
    // storageCreateRef = firebase.storage().ref();
  storageCreateRef = this.storageGetReference.ref();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'User/json' })
  };

  constructor(private http: HttpClient,
              private firestore: AngularFirestore,
              private readonly storage: AngularFireStorage,
              private aFireAuth: AngularFireAuth) {

      /*  this.postCollection = this.firestore.collection('posts');
      this.posts = this.postCollection.snapshotChanges()
        .pipe(changes => {
          return changes.pipe( ps => {
            const data = ps.toPromise;
            data.title = ps.payload.doc.title;
            return data;
          })
        }); */
        // this.http.put(this.cadena2, body);

    /*   const miCadena = environment.firebaseConfig.databaseURL;
      const blob = new Blob([JSON.stringify(miCadena, null, 2)], {type : 'application/json'});
 */
      /* ejemplo tutorial */
     /*  this.postCollection = afs.collection<Post>('Posts');
      this.posts = this.postCollection.snapshotChanges()
       .pipe(map(
         actions => actions.map( a => {
           const data = a.payload.doc.data() as Post;
           const id = a.payload.doc.id;
           return{id, ...data};
         })
       )) */
       /* termina ej tutorial */
  }

/*const inicio = AngularFireModule.initializeApp(environment.firebaseConfig);*/
mostrardatos() {
  // const db = firebase.firestore();
  console.log('Referencia db ', this.db,
  'Ref storage ', this.storageCreateRef);
}

// ************** IMAGENES ****************************
/*///////////// carga imagen////////////////////// */
onUploadAllImag2(event: any) {
  alert('Method not implemented 1' );
  alert('Method not implemented 2' + event);
}
   /*///////////  Upload image IMAGEN metodo que las sube//////////////////////////*/
  onUploadAllImag(images ?: any[]): void {

    alert ('LEngth ' + images.length);

    for (const oneImg of images) {
      oneImg.uploading = true;  // avisa que se esta subiendo imagen file, no se si mejor lo borro.
      // Abajo, creamos un nombre con el titulo de la imagen para que sea unico, gracias al metodo de abajo
      
      alert ('NAME ' + oneImg.name);
      
      const filePathName = this.generateNameImage(oneImg.name);

      console.log('filePathName,' , filePathName);

      const fileRef = this.storage.ref(filePathName); // creamos una referencia a la ruta donde la guardaremos
      const task = this.storage.upload(filePathName, oneImg); // sube la imagen aca con esos datos

      oneImg.uploadPercent = task.percentageChanges(); // guarda porcentaje para mostrar la barra de carga
      this.porcentage = task.percentageChanges();
      task.snapshotChanges()  // abajo es la magia de firebase
        .pipe(
          finalize(() => {
            oneImg.downloadUrl = fileRef.getDownloadURL();
            oneImg.uploading = false;
          })
        ).subscribe();
      this.imageLista.push(oneImg);
      this.onChangeImage.next(this.imageLista.slice());
    }
  }
    /* -------------   Sube de a una Imagen  ----------- */
  onUploadOneImag(oneImg: Image): void {
    oneImg.uploading = true;  // avisa que se esta subiendo imagen file, no se si mejor lo borro.
    // Abajo, creamos un nombre con el titulo de la imagen para que sea unico, gracias al metodo de abajo
    const filePathName = this.generateNameImage(oneImg.title);
    console.log('filePathName, filePathName');

    const fileRef = this.storage.ref(filePathName); // creamos una referencia a la ruta donde la guardaremos
    const task = this.storage.upload(filePathName, oneImg); // sube la imagen aca con esos datos

    oneImg.uploadPercent = task.percentageChanges(); // guarda porcentaje para mostrar la barra de carga
    this.porcentage = task.percentageChanges();
    task.snapshotChanges()  // abajo es la magia de firebase
      .pipe(
        finalize(() => {
          oneImg.downloadUrl = fileRef.getDownloadURL();
          oneImg.uploading = false;
        })
      ).subscribe();
    this.imageLista.push(oneImg);
    this.onChangeImage.next(this.imageLista.slice());
}

  getPercentage(): Observable<number> {
    return this.porcentage;
  }
  // Genero nombre, para controlar que no se guarden imagenes con igual nombre
   private generateNameImage(name: string): string {
     return `${this.MEDIA_STORAGE_PATH}/${new Date().getTime()}-${name}`;
     // return this.MEDIA_STORAGE_PATH + '/' + new Date().getTime() + '-' + name
   }

 // prueba borrar, solo lo estoy usando con botton extraer de prueba, puede servir para new post
   /* extrarerImageness(imgs: Image[]): void { */
  extrarerImageness(img?: Image): void {

    if (!this.imageLista.length) {
      alert('NO hay listado');
    }

    if (!img) {
      alert('no hay imagen a subir');

    } else {
      console.log(img.title, 'TITULO');
      // const imgs = this.imageLista; // esto deberia ser imagenes del parametro cuando sube muchas
      // console.log('Length from service', imgs.length);
      /* for (const prop of Object.getOwnPropertyNames(imgs)) { */
      // for (const temp of imgs) {
      // console.table(temp);
      /*  const temp = imgs[prop]; */
      // if (this.canBeLoaded(temp)) {
      //  console.log('temp', temp);
      // const newImage = new Image(temp.);
      //  const newImage = new Image(temp.title, temp.size2, temp.detail, temp.type);
      //  this.imageLista.push(newImage);
      // this.onChangeImage.next(this.imageLista.slice());



      if (!this.checkNameRepit(img.title, this.imageLista)) {
        this.imageLista.push(img);
        this.onChangeImage.next(this.imageLista.slice());
        console.log('largoo', this.imageLista.length);
        alert(this.imageLista.length);
        for (const temp of this.imageLista) {
          console.table(temp);
        }
      } else {
        console.log('Name of the image is repeated ');
        alert('Name of the image is repeated ');
      }

    }
    /*
    lo de canBeLoaded no puede comprobar pues  no encuentra lista para validateType
    if (this.canBeLoaded(img)) {
      this.imageLista.push(img);
      console.log('largoo', this.imageLista.length);
      this.onChangeImage.next(this.imageLista.slice());
    } */
  }


    // valida el archivo a subir, usando metodos con extends la clase ImageValidator
    private canBeLoaded(ima: Image): boolean {
      let res = false;
      if (!this.checkNameRepit(ima.title, this.imageLista) &&
        this.validateType(ima.detail)) { // this.validateType(archivo.file.type)) si fuera type Image
        res = true;
      }
      console.log(res, 'canBeLoaded');
      return res;
    }
    // comprueba si la imag tiene cargada igual nombre a las que estan en el array
    checkNameRepit(fileName: string, files: Image[]): boolean {
      let res = false;
      for (const fil of files) {
          if (fil.title === fileName) {
              res = true;
          }
      }
      return res;
  }
  validateType(tipoArchivo: string): boolean {

    /* return tipoArchivo === '' || tipoArchivo === undefined ? false : true;
    si pasa tipo imagen vacio o undefined retorna false sino true por el includes en array acceptType*/

    return tipoArchivo === '' || tipoArchivo === undefined
        ? false
        : this.acceptType.includes(tipoArchivo);
  }

  getImageList(): Image[] {
    return this.imageLista;
  }
/* *******************   ADD or CREATE   ************************* */

onCreatePost(postData ?: Post) {
  // Send Http request POST
  this.createPost(postData);
  this.add(postData);
}

createPost(postData: Post) {
  // Send Http request POST
  alert('desde service');

  const body = {
    id: postData.id,
    title: postData.title,
    content: postData.content,
    imageUrl: postData.imageUrl,
    data: postData.data};

  // this.http.post(this.cadena, body) // this.http.post(this.cadena, postData) es lo mismo
  this.http.post<Post>(this.cadena, body)  // this.http.post(this.cadena, postData) es lo mismo
    .subscribe(
      resp => {
        console.log(resp.toString() + 'RESPUESTA service createPost');
      }, () => {
        alert('NO');
      });
}

  createPost3(post: Post) {
    return this.postCollection.add(post);
  }

  add(post: Post) {
    this.posts2.push(post);
    this.onChange.next(this.posts2.slice());
    /* this.viewPost.next(post); */
  }

  add2(post: Post): Observable<any> {
    const httpOptins = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const body = {
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl
    };
    if (post.title) {
      return this.http.put(this.cadena + post.title, body, httpOptins)
        // return this.http.put(this.cadena, post)  pa mi es asi
        .pipe(map((data: any) => alert(`${data}SII`))
              );
      } else {
        return this.http.post<Post>(this.cadena + post.title, body, httpOptins)
          .pipe(
                map(
                  (data: any) => alert(`${data}NO`))
              );
      }
  }

/* *******************   GET   ************************* */

getDatabaseDatas() {
  console.log('Largo desde service ', this.firestore.collection.length);
  return this.firestore.collection.length;
}

 fetchPosts(): Post[] {  // obtiene y agrega Post
   this.getTodosPost();
   // return this.loadedPosts;
   return this.posts2.slice();

}

private getTodosPost() {
  alert('ACA getTodosPost DEL SERVICO y los agrega al array local');

  console.log('HELLOo');
  const referenciaDeUsuario = `${environment.firebaseConfig.databaseURL}User.json`;
  const referenciaDePost1 = `${environment.firebaseConfig.databaseURL}Posts.json`;
  const referenciaDePost2 = this.cadena;
  const referenciaDeFly = `${environment.firebaseConfig.databaseURL}Fly.json`;
  const db = firebase.firestore();

  console.log('Referencia db ', db, 'Ref storage ', this.storageCreateRef);

  const res = this.firestore.collection('Post').snapshotChanges();
  console.log('res ', res.pipe());

  const cef3 =  this.firestore.collection('User').snapshotChanges().pipe();
  const miRef = db.collection('User');

  Object.keys(miRef).map((k) => {console.log('MAP ' , k ); });

 // this.isAuth();

  /* otra */
  /* const dato2 = async value => await (await db.collection('User').get())
    .docs[0].data();
  Object.keys(dato2).map(k => {console.log('Feni ' ,  k); }); */

  /* console.log('USUARIO- ' ,  this.firestore.collection('User'));
  console.log('REF- ' ,  firebase.storage().ref().bucket); */

  /* Estoy llamando post de BD por su key, creo un nuevo post y agrega a lista post local */
  this.http.get<Post>(referenciaDePost1)
  .subscribe((posts) => {
    for (const key in posts) {
      if (Object.prototype.hasOwnProperty.call(posts, key)) { // dice que, si tiene prop key
        const element = posts[key];

        // console.log('POSTS ' , element);

        const id = element.id;
        const titulo = element.title + '';
        const content = element.content + '';
        const imageUrl = element.imageUrl + '';

        const neePst: Post = new Post (id, titulo, content, imageUrl);
        this.posts2.push(neePst);
        this.onChange.next(this.posts2.slice());
        /*
        this.onChange.next(this.loadedPosts.slice());
        return this.loadedPosts; */

        // muestro titulo del Post
        console.log('***'
        , element.title,
         '/ ', id
        , '/ ', titulo
        , '/ ', content
        , '/ ', imageUrl);

      }
    }
  });

  /* ----------------------- POST ------------------------------------ */
  /*-------  muestra solo Id de firebase del objeto Post/ ---------*/
  this.http.get<Post>(referenciaDePost1)
    .subscribe(posts => {
      Object.keys(posts).map((k) => {// const blob = new Blob([JSON.stringify(Post)], {type : 'application/json'});
       // console.table([ k]);
       console.log('ID de Post ' + k );
      });
  }, () => {
      alert ('NADA');
    });

    /*-------  muestra todo el objeto Post/ ---------*/
  this.http.get(referenciaDePost1)
    .subscribe(fl => {
      console.log('All post from BD ', fl);
    });

  /* --- agrego a la matriz el Objets js del get con operadores Observables pipe y map antes des suscribe- */
  this.http.get<Post>(referenciaDePost1)
  /*sera el tipo de cuerpo de respuesta que luego será manejado automáticamente por Angular HttpClient y TypeScript entiende */
    .pipe(map((response) => {
      const postArray: Post[] = [];
      for (const key in response) {
        if (Object.prototype.hasOwnProperty.call(response, key)) {
          // const element = response[key];
          postArray.push({ ...response[key], IdFirebase: key });
          // el operador de propagación ademas de la key que podria usar despues como delete
        }
      }
      return postArray;
    })).subscribe((pst) => {
      pst.forEach(element => {
        console.log(element.title);
      });
      console.log('Los post son : ', pst);
      //  console.table([pst]);
      this.loadedPosts = pst;
    });

    /* ----------------------------------------------------------- */
/* --------------------- USU -------------------------------------- */
  this.http.get<User>(referenciaDeUsuario)
  .subscribe((usus) => {
    for (const key in usus) {
      if (Object.prototype.hasOwnProperty.call(usus, key)) {
        const element = usus[key];
        console.log('USUS ' , element.name);
      }
    }
  });

  this.http.get<User>(referenciaDeUsuario)
  .subscribe((dato) => {
    Object.keys(dato).map((k) => {
      console.log('Dato de Usuario ' + k );
    });
  }, () => {
      alert ('NADA');
    });
/* ----------------------------------------------------------- */
/* ----------------FLY------------------------------------------- */
  this.http.get(referenciaDeFly)
  .subscribe((flys) => {
    for (const key in flys) {
      if (Object.prototype.hasOwnProperty.call(flys, key)) {
        const element = flys[key];
        console.log('FLYS ' , element);
      }
    }
  });
  this.http.get(referenciaDeFly)
  .subscribe(fl => {
        console.log('All Flys from BD  ' , fl);
    });



} /* Termina  getTodosPost*/

  getosts2(): Post[] {
    return this.posts2.slice();
  }

  getPost(id: number): Post {
    return this.posts2.slice()[id];
  }

  getPost4(id: number): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get<Post>(environment.firebaseConfig + 'Post/' + id , httpOptions)
      .pipe(map((data: Post) => data)
    );
  }

  getPostTitle(title: string): Post {
    const post = this.posts2.find(
      (p) => {
        return p.title === title;
      }
    );
    if (post) {
      return post;
    }
    return null;
  }

  /* *******************   DELETE   ************************* */

  delete(id: number): boolean {
    if (this.posts2.splice(id, 1)) {
      this.onChange.next(this.posts2.slice());
      return true;
    }
    return false;
  }

  deletePost3(pos: Post) {
    // return this.postCollection.doc(post.title).delete();
    this.postCollection.doc(pos.title).delete();
    // this.onChange.next(this.postCollection);
    /* const index = this.posts2.indexOf(pos);
    if (index > -1 ) {
      this.posts2.splice(index, 1);
    } */
  }
  deletePost4(pos: Post): boolean {
    const index = this.posts2.indexOf(pos);
    if (index > -1 ) {
      this.posts2.splice(index, 1);

      this.onChange.next(this.posts2.slice());
      return true;
    }
    return false;
  }

/*///////////      DELETE: delete from the server firebase ////////////////*/
  deletePost5(pos?: Post): Observable<Post> {
    const id = typeof pos === 'number' ? pos : pos.title;
    const url = `${environment.firebaseConfig.databaseURL + 'Post.json'}/${id}`;
    // private cadena = environment.firebaseConfig.databaseURL + 'Posts.json'; Esta no tiene el id

    alert ( `{url -} ${url}`);
    return this.http.delete<Post>(url, this.httpOptions)
      .pipe(
      tap(_ => {
        return console.log(`deleted post id=${id}`);
        alert(`deleted post id=${id}`);
      }),
      catchError(this.handleError<Post>('deletepost'))
    );
    this.onChange.next(this.posts2.slice());
  }
/*
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'User/json' })
  }; */
  deletePost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<Post>(this.cadena + post.title, httpOptions)
     // private cadena = environment.firebaseConfig.databaseURL + 'Posts.json';
      .pipe(map((data: any) => data));
  }

  deleteAll() {
    while (this.posts2.length) {
      this.posts2.splice(0, 1);
    }
    this.onChange.next(this.posts2.slice());
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /* UPDATE or EDIT*/

  // updatePost(id: number, postInfo: { title: string, contenido: string }): void {
  updatePost(id: number, post: Post, image?: any): void {
    let res = this.posts2.find(
      (p) => {
        alert(p.id + 'lll' + id);
        return p.id === id;
      }
    );
    if (res) {
      if (image) {
        alert(' add whith image');
        const body = new Post(
          post.id,
          post.title,
          post.content,
          image);
        // this.onUploadAllImag(post, image);
        // this.add(post);
        this.onCreatePost(body);
      } else {
        alert(res.toString() + ' service_updatePost ' + post.toString());
        res = post;
        /* informamos a otros componentes del cambio en la copia de la matriz, que dessuscribo en el comp a usar*/
        this.onChange.next(this.posts2.slice());
        this.viewPost.next(res);

        this.http.post(this.cadena, res)
          .subscribe(resp => {
            console.log(resp + 'RESPUESTA updatePost');
          }, () => {
            alert('NO');
          }); }
      } else {
        alert('no actialixo ');
      }
    }

   updatePost4(post: Post, image?: any) {
    if (image) {
      alert('updatePost4 >> add');
      // this.onUploadAllImag(post, image);
      this.add(post);
    } else {
      alert('updatePost4 >> No ADD');
      // return this.postCollection.doc(post.title).update(post);
      return this.add(post);
    }
  }

   updatePost5({ id, newPost}: { id: number; newPost: Post; }) {
    this.posts2[id] = newPost;
    this.onChange.next(this.posts2.slice());
    this.viewPost.next(newPost);
  }

  updatePost2(newPost: Post) {
    const index = this.posts2.indexOf(newPost);
    alert(index + ' updatePost2 Nº position');
    const name = newPost.title;
    if (index > -1 ) {
      this.posts2[index] = newPost;
      this.onChange.next(this.posts2.slice());
      this.viewPost.next(newPost);  // para mostrar magen

      this.http.post(this.cadena, newPost)
        .subscribe(resp => { console.log(resp + 'RESPUESTA updatePost2');
                             alert('SIIII');
     }, () => {
      alert('NO');
    });
    }
    this.add(newPost);
  }

  updatePost3(post: Post) {
    return this.postCollection.doc(post.title).update(post);
  }

/* createPost(postData: Post) {
  // Send Http request POST
  alert('desde service' + postData.toString());

  const body = {
    id: postData.id,
    title: postData.title,
    content: postData.content,
    imageUrl: postData.imageUrl,
    data: postData.data};

  this.http.post(this.cadena, body)
  .subscribe(resp => { console.log(resp.toString() + 'RESPUESTA service createPost');
     }, () => {
      alert('NO');
    });
} */


onLogingoogle() {
  return this.aFireAuth.signInWithPopup(new auth.GoogleAuthProvider ());
}

onLoginFace() {
  return this.aFireAuth.signInWithPopup(this.provideFace);
}

onLogoutUser() {
  alert('SALE con RANDOM ' + Math.random());
  return this.aFireAuth.signOut();
}

isAuth(): any {
  // invento a ver si sale, este sera el usu logado actualmente
 /*  this.aFireAuth.authState.subscribe(user => {
    if ( user) {
      this.userLogueadoID = user.uid;
      this.userLogueadoName = user.displayName;
      this.userLogueadoEmail = user.email;
      this.userLogueadoURL = user.displayName;
      this.userLogueadoPhoto = user.photoURL;
      console.log('Estamos en isAuth del servicio con - ', this.userLogueadoPhoto);
    } else {
      console.log('FOTO2 ');
    }
    console.log('USUARIO- ' ,  this.firestore.collection('User'));
    console.log('REF- ' ,  firebase.storage().ref().bucket);
  }); */
  console.log('USUARIO- ' ,  this.firestore.collection('User'));
  console.log('REF- ' ,  firebase.storage().ref().bucket);

 // return this.aFireAuth.authState.pipe(map( () => firebase.auth));
  return this.aFireAuth.authState.pipe(map(aut => aut));
}

  ////////////////  USER  /////////////////////////////
  registerUser(email: string, password: string) {
    return new Promise(( resolve, reject) => {
      this.aFireAuth.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }
   /*--------- prueba Usuario -------------*/
   pruebaGuardarUsu(datoUsu: any) {
     /* 
     private cadena = environment.firebaseConfig.databaseURL + 'Posts.json';
  private cadena2 = `${environment.firebaseConfig.databaseURL}Jugadores.json`;
  private cadena3 = `${environment.firebaseConfig.databaseURL}User.json`; */
    const cadenasa = `${environment.firebaseConfig.databaseURL}Lala.json`; // es = a cadena 3
    this.http.post(this.cadena3, datoUsu)
        .subscribe(resp => {
          console.log('SIIII se guardo usuario');
          }, (error) => {
            console.log(error, 'NO guardo usuario');
          });
        }

    /* -------------termina usuario ----------------------*/

/*  INVENTO DELETE USER */
deleteUser(ud: string) { // ej id MEAJzcyoJpxS8MODC0z
  // const usser =0;
  const unPostborrar = new Post(44, 'LALA', 'Mayor',
  'https://tse3.mm.bing.net/th?id=OIP.0F55zIrLRsqZHae9hGlwSAHaEJ&pid=Api&P=0&w=304&h=171');
  ud = 'MEAJzcyoJpxS8MODC0z';
  const de = this.db;
  const db2 = this.firestore.collection('User');
 /*  console.log('db', db2);
  console.log('db2', db2);
  const db3 = this.firestore.collection('Post').add(unPostborrar);
  console.log('Post', db3);
  const db4 = this.firestore.collection('Post').doc('-MF6jkTO_WqUkrn-_ob3');
  console.log(' Name', db4);

  const unUsu1 =  this.db.collection('User').doc(ud).get();
  const unUsu2 =  db2.doc(ud).snapshotChanges();
  const unUsu3 =  this.db.collection('User').doc(ud);
  console.log('el usu1 ', unUsu1);
  console.log('el usu2 ', unUsu2);

  unUsu3.delete().then(() => {
    console.log('ELIMINADO');
  }, (error) => {
    console.log('ERROR');
  });
  */
/* 0tro */
 /*  this.firestore.collection('Post').add(unPostborrar)
 .then(() => {
    console.log('CREADO');
  }, (error) => {
    console.log('ERROR al crear');
  }); */
/* 0tro */
  // Send Http request POST
  this.http.post(this.cadena, unPostborrar)
    .subscribe(resp => {
      console.log(resp.toString() + 'RESPUESTA service createPost');
      }, () => {
        console.log('NO');
      });
}

/* Tratando de obtener datos de Firebase */
updateUser(user?: User) {
  /* const usewrRef = firebase.firestore().collection('User').add({
    oneName: 'Lala',
    comentario: 'Immpeca'
  }); */

 /*  const UsuCollection1 = firebase.firestore().collection('User').get()
  .then((resp) => {resp.docs.map((item) => {console.log('FENIX', item);
  }); }); */

 // const UsuCollection2 = this.firestore.collection('User');
 // const UsuCollection3: AngularFirestoreDocument<User> = this.firestore.doc('User');

 /* this.posts = this.postCollection.snapshotChanges()
      .pipe(changes => {
        return changes.pipe( ps => {
          const data = ps.toPromise;
          data.title = ps.payload.doc.title;
          return data;
        })
      });  */

  alert('YES-' );
  // console.log('YES-BD ', UsuCollection2);
  console.table(['YES-BD', 'Banana', 'Manzana' ]);

  const db = firebase.firestore();
  console.log('Firebase =  ', db);

  const storageCreateRef = firebase.storage().ref();
  console.log('Referencia db ', storageCreateRef);

  const storageCreateRef2 = firebase.storage().ref().bucket;
  console.log('Nombre db 2 ', storageCreateRef2);

  /* const citiesRef = db.collection('Post');
  const allCities = citiesRef.get()
  .then(lala => {
    lala.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  }); */

  /* const dato =   db.collection('Fly').doc('Fly').get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
 */
  /* const citiesRef1 = db.collection('Fly');
  const citiesRef2 = db.collection('Post');
  const citiesRef3 =  this.firestore.collection('User').snapshotChanges().pipe();
  Object.keys(citiesRef1).map((k) => {console.log('1 ' , k );
  });
  Object.keys(citiesRef2).map((k) => {console.log('2 ' , k );
  });
  Object.keys(citiesRef3).map((k) => {console.log('3 ' , k );
  }); */

  /* const storageCreateRef3 = localStorage.getItem('User');
  const daaa = JSON.parse(storageCreateRef3);
  Object.keys(daaa).map(k => {console.log('DESDE MAP ', k);
  }); */

  /* const dato2 = async value => await (await db.collection('User').get())
    .docs[0].data();
  Object.keys(dato2).map(k => {console.log('Feni ' ,  k); }); */


  /* const dato = async value => await db.collection('User').get()
  .then((resp) => resp.docs.map((item) => {
    console.log('item ', item);
  }) );
  console.log('DAto ', dato); */

  /* const datt = this.firestore.collection('Fly').snapshotChanges()
  .pipe().subscribe((dato)=>{
      console.log(dato, 'Datt');
  });
   */

  /* const res =  this.firestore.collection('Fly').snapshotChanges()
  .pipe(finalize(() => {
    alert('TA');
  }))
  .subscribe(() => {
    console.log('Documento eliminado!');
  }, (error) => {
    console.error(error);
  }); */

}

/* Termina invento */

/* public deleteCat(documentId: string) {
    return this.firestore.collection('cats').doc(documentId).delete()
      .then(() => {
        console.log('Documento eliminado!');
      }, (error) => {
        console.error(error);
      });
  } */

  /* /////////////////JUGADORES ////////////////////////*/
  pruebaGuardarajugador(datoJugador) { // : Observable<any>
    /* VALE*/
    // private cadena2 = environment.firebaseConfig.databaseURL + 'Jugadores.json';
     const cadenasa = `${environment.firebaseConfig.databaseURL}Jugadores.json`;
     this.http.post(this.cadena2, datoJugador)
      .subscribe(resp => {
        }, () => {
          alert('NO');
        });

    /* NO ANDA pero deberia
    const httpOptins = {
      headers: new HttpHeaders({ 'Content-Type': 'Jugadores/json' })
    };
    const body = {
      first: datoJugador.first,
      last: datoJugador.last,
      born: datoJugador.born
    };

    this.http.post(this.cadena2, body)
    .subscribe(resp => { console.log(resp.toString() + 'RESPUESTA service createJugador');
      }, () => {
        alert('NO');
      });


    if (datoJugador.first) {
      alert('SII')
      return this.http.post(this.cadena2 + datJugador.title, body, httpOptins)
        .pipe(
          map((data: any) => data)
        );
    } else {
      alert('no actialixo ');
      return this.http.put(this.cadena2 + datJugador.title, body, httpOptins)
        .pipe(
          map((data: any) => data)
        );
    } */

    // return this.http.post(this.cadena2, datJugador).subscribe(resp => {

    /* .add({
      jugador: {datJugador}
    })
    .then(docRef => {
      console.log('Document id ' + docRef.id);
    })
    .catch(error => {
      console.log('Error adding ' + error);
    }); */
  }
  /* -----------------termina jugador ------------*/

  /* ///////////////GATO CAT ///////////////////////
  /* Crea un nuevo gato*/
  public createCat(data: { nombre: string, url: string }) {

    /* ver si anda esto, dejando el return tambien, es invento para crear Cat */
    /* const cadena3 = environment.firebaseConfig;
    const httpOptions3 = {
      headers: new HttpHeaders({ 'Content-Type': 'Cat/json' })
    };
    const body3 = {
      first: data.nombre,
      mail: data.url,
      born: new Date().getTime()
    };
    this.http.post(cadena3 + 'Cat', body3, httpOptions3); */

    return this.firestore.collection('cats').add(data);
  }

  // Obtén todos los documentos de una colección
  public getCats() {
    return this.firestore.collection('cats').snapshotChanges();
  }

  public getCats2()  {
    const db = firebase.firestore();
    const citiesRef = db.collection('cities');
    const allCities = citiesRef.get()
    .then(dato => {
      dato.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }


  // recuperar varios documentos con una solicitud a través de una consulta
  public getCats3() {
    const db = firebase.firestore();
    const citiesRef = db.collection('cities');
    const query = citiesRef.where('capital', '==', true).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  // Obtiene un gato
  public getCat(documentId: string) {
    return this.firestore.collection('Fly').doc(documentId).snapshotChanges();
  }
  public deleteCat(documentId: string) {
    return this.firestore.collection('cats').doc(documentId).delete()
      .then(() => {
        console.log('Documento eliminado!');
      }, (error) => {
        console.error(error);
      });
  }
  // Actualiza un gato
  public updateCat(documentId: string, data: any) {
    return this.firestore.collection('cats').doc(documentId).set(data);
  }

}
