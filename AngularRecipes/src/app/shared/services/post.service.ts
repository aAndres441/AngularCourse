import { Injectable } from '@angular/core';
import { Post } from '../../shared/post/post.model';
import { Subject, Observable, of, pipe, Subscription } from 'rxjs';
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
import { error, Key } from 'protractor';
import { PortalHostDirective } from '@angular/cdk/portal';
import { constants } from 'perf_hooks';
import { LoginComponent } from '../login/login.component';

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

  uploadPercent: Observable<number>; // sera numero para subida al storage
  upURLPercentage: Observable<string>; // sera un string  para subida al storage

  elError = null;
  elErrorSubj = new Subject<boolean>();

  /* taodo para image */
  private MEDIA_STORAGE_PATH = 'imagenesUdemy'; // Para crear una carpeta en firebase con ese nombre
  private acceptType = ['image/jpg', 'image/png'];
  imageLista: Image[] = [];
  downloadUrl: string;
  private porcentage: Observable<number>;
  onChangeImage = new Subject<Image[]>();
  fetchingPost = new Subject<boolean>();

   private posts2: Post[] = [
    new Post ( 100, 'Jorge', 'Caminante', 'https://tse3.mm.bing.net/th?id=OIP.0F55zIrLRsqZHae9hGlwSAHaEJ&pid=Api&P=0&w=304&h=171'),
    new Post ( 101, 'Clock', 'In two binding', 'https://tse3.mm.bing.net/th?id=OIP.WwiZsucIqy6R4taHgUJ2CQHaHa&pid=Api&P=0&w=300&h=300'),
    new Post ( 102, 'Lemur', 'In my mind', 'https://tse1.mm.bing.net/th?id=OIP.hNOV7KRYdK93MsE6SXHMVQHaLH&pid=Api&P=0&w=300&h=300')
  ];

  postArrayOfKeys: string[] = [];

  imageArray: [
    {"id": "1460",
    "width": 810,
    "height": 1080,
    "url": "https://www.animalesoviparos.net/wp-content/uploads/2019/09/peces-1280x720.jpg",
    "full": {
      "width": 1080,
      "height": 1440,
      "url": "https://cumbrepuebloscop20.org/wp-content/uploads/2018/10/discus-fish-1943755_640.jpg"
    },
    "big": {
      "width": 500,
      "height": 670,
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYOHM1Pl0id2UbwQJL5pstii_kF4ANYAMWYg&usqp=CAU"
    },
    "medium": {
      "width": 120,
      "height": 160,
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYOHM1Pl0id2UbwQJL5pstii_kF4ANYAMWYg&usqp=CAU"
    },
    "small": {
      "width": 120,
      "height": 100,
      "url": "https://conceptodefinicion.de/wp-content/uploads/2014/04/hoja.jpg"
    }    
  } ];

   addInvento1(x:number, y: number) {
    return x+y;
  }
   addInvento2 = (x:number, y: number) => y+x;

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
    // IS a reference from our storage service
    // storageCreateRef = firebase.storage().ref();
  storageCreateRef = this.storageGetReference.ref();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'User/json' })
  };


  constructor(private http: HttpClient,
              private firestore: AngularFirestore,
              private readonly storage: AngularFireStorage,
              private aFireAuth: AngularFireAuth) {

      /*  this.postCollection = this.firestore.collection('Posts');
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
  const db = firebase.firestore();
  console.log('Ref fire ', firebase);
  console.log('Ref db0 ', firebase.firestore());
  console.log('Ref db1 ', firebase.firestore().app.name);
  console.log('Ref db2 ', firebase.firestore().app.options);
  console.log('Ref Storage ', firebase.storage());
  console.log('Ref Storage2 ', firebase.storage().ref());
  console.log('Ref from storage ', firebase.storage().ref().bucket);
  console.log('Ref Child ', firebase.storage().ref().child[0]);
  console.log('Ref from BD Post ', firebase.storage().ref('Posts').bucket);

    // Create a reference to the Posts collection
  const postsRef1 = this.db.collection('Posts');
  console.log('postsRef1' , postsRef1, '---------lo mismo',
     firebase.firestore().collection('Posts'));

  const referenciaDePost1 = `${environment.firebaseConfig.databaseURL}Posts.json`;
  const idAleatorio = Math.random().toString(36).substring(2);
  const numAleatorio = Math.floor(Math.random() * 256);
  const filePath = `${referenciaDePost1} ${idAleatorio}`; // nombra carpeta y sera la ruta
  const filePath2 = `Lalalala_${idAleatorio}`; // nombre carpeta y sera la ruta

  // const refStorage = this.storage.ref('lal'); // referencia

  // tslint:disable-next-line: no-unused-expression
  // tslint:disable-next-line: max-line-length
  const post1 = new Post ( 100, 'Jorge', 'Caminante', 'https://tse3.mm.bing.net/th?id=OIP.0F55zIrLRsqZHae9hGlwSAHaEJ&pid=Api&P=0&w=304&h=171');
  const algo: any = {name: 'Capurro', age: 66} ;
  // const task = this.storage.upload(referenciaDePost1, algo); // con esto sube con su ruta y el post

   /* guarda el porcentaje de subida, no lo estoy usando, pero si lo uso en service */
 // this.uploadPercent = task.percentageChanges();

    /* aca obtenemos la ruta de la imagen */
  /* task.snapshotChanges()
      .pipe(finalize(() => {
        this.upURLPercentage = refStorage.getDownloadURL();
        console.log('snapshotChanges', this.upURLPercentage);
      }))
      .subscribe(); */

      /*----------- OBTENGO Post IDFireStore  -----------------*/
  this.http.get(referenciaDePost1)
  .subscribe(dat => {
    Object.keys(dat).map((elId) => {
      console.log('ID Post from BD  ' , elId);
     });
    });

  console.log(`**** refPost  ${referenciaDePost1}
                * ID  ${idAleatorio}
                Nº  ${numAleatorio}`);

  // console.log(`**** refStorage  ${refStorage.child[0].title}`);
  // console.log(`**** task  ${task}`);


  /* ***********  Termina mostrardatos  ****************** */
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
/* *******************   ADD or CREATE  POST   ************************* */

onCreatePost(postData: Post) {
  this.createPost(postData);
  this.add(postData);
}

createPost(postData: Post) {
  // Send Http request POST
  alert('Create from service');

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  const body = {
    id: postData.id,
    title: postData.title,
    content: postData.content,
    imageUrl: postData.imageUrl,
    data: postData.data
  };

  if (postData.IdFirebase) {
    return this.http.put(this.cadena + postData.IdFirebase, body, httpOptions)
      // return this.http.put(this.cadena, post)  pa mi es asi
      .pipe(map((data: any) => {
          alert(`${data}SII`);
        })
      );
  } else {
    return this.http.post<Post>(this.cadena, body, httpOptions)
      .pipe(map((data: Post) => {
        // esto de abajo no suma nada o sea ni sirve
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            this.postArrayOfKeys.push(...key);
            alert('ARRAY ' + this.postArrayOfKeys.length);
            console.table(`${key}Algun dato`);

            alert('ARRAY length ' + this.postArrayOfKeys.length);
          }
        }        
        // return postArray;
      }))
      .subscribe(
        resp => {
          console.log('RESPUESTA service createPost' , resp);
        }, () => {
          alert('NO');
        });
  }
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
    this.loadedPosts.push(post);
    this.onChange.next(this.loadedPosts.slice());

    /* this.posts2.push(post);
    this.onChange.next(this.posts2.slice()); */

    /* this.viewPost.next(post); */
  }

  add2(post: Post): Observable<any> {
    const httpOptins = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const body = {
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      data: post.data
    };
    if (post.title) {
      return this.http.put<Post>(this.cadena + post.title, body, httpOptins)
        // return this.http.put(this.cadena, post)  pa mi es asi
        .pipe(map((data: any) => {
            alert(`${data}SII`);
          })
        );
    } else {
      return this.http.post<Post>(this.cadena + post.title, body, httpOptins)
        .pipe(map((data: any) => {
          const postArray: Post[] = [];
          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              postArray.push({ ...data[key], IdFirebase: key });
              console.table(postArray);
              
            }
          }
          alert(`${data}NO`);
          return postArray;
        }));
    }
  }
/* *******************   GET   ************************* */

getDatabaseDatas() {
  console.log('Largo desde service ', this.firestore.collection.length);
  return this.firestore.collection.length;
}

 fetchPosts(): Post[] {  // obtiene y agrega Post
   this.getTodosPost();

   return this.loadedPosts.slice();
  // return this.posts2.slice();

}

private getTodosPost() {
 // alert('ACA getTodosPost DEL SERVICO y los agrega al array local');
 // const uid = userData?.uid;
  console.log('HELLOo');
  const referenciaDeUsuario = `${environment.firebaseConfig.databaseURL}User.json`;
  const referenciaDePost1 = `${environment.firebaseConfig.databaseURL}Posts.json`;
  const referenciaDePost2 = this.cadena;
  const referenciaDeFly = `${environment.firebaseConfig.databaseURL}Fly.json`;
  const db = firebase.firestore();
// storageGetReference = firebase.storage();
// storageCreateRef = this.storageGetReference.ref();
let options= " select * from Posts";
 
  console.log('Referencia db ', db,
              'MORE REF= ' , db.app.options.valueOf(),
              'Ref storage ', this.storageCreateRef );

  /* ----------------------- POST ------------------------------------ */

  this.fetchingPost.next(true);
  /*-------  muestra todo el objeto Post/ ---------*/
  this.http.get(referenciaDePost1)
  .subscribe(fl => {
    console.log('All post from BD ', fl);
  });

  /* Estoy llamando post de BD por su key, creo un nuevo post y agrega a lista post local */
  /* --- agrego a la matriz el Objets js del get con operadores Observables pipe y map antes des suscribe- */

    /*Podria hacer que el subscribe de abajo no es necesario pues usamos el rteurn,
    que devuelve un observble y lo subscribimos en el componente, tanto en OnInit como cuando
    llamo ce nuevo al metodo del servicio, seria
    this.service.fetchPosts().subscribe(psts=>{this post = psts})
     ni tampoco necesitariamos subject pues existe solo un componente interesado.
     Seria return this.http.get<Post>(referenciaDePost1)..hasta return postArray;*/

this.http.get<Post>(referenciaDePost1)
/*sera el tipo de cuerpo de respuesta que luego será manejado automáticamente por Angular HttpClient y TypeScript entiende */
  .pipe(
    map((response) => {
    const postArray: Post[] = [];
    for (const key in response) {
      if (Object.prototype.hasOwnProperty.call(response, key)) {
        const eleme = response[key];
        ///////////////////if()
        postArray.push({ ...eleme, IdFirebase: key });
        // el operador de propagación ademas de la key que podria usar despues como delete
      }
    }
    console.log('Table of response');
    console.table(response);
    console.log('Table of posts');
    console.table(postArray);
    return postArray;
  })).subscribe((pst) => {
    pst.forEach(element => {
      console.log(element.title);
    }, (error: { message: boolean; }) => {
      this.elErrorSubj.next(error.message);
    });

    // console.log('Los post son : ', pst);
    //  console.table([pst]);

    this.fetchingPost.next(false); ///primero lo hace true y al cargar pasa a false.
    this.loadedPosts = pst;
    this.onChange.next(this.loadedPosts.slice());
  });

  // this.isAuth();

  /* this.http.get<Post>(referenciaDePost1).pipe */
              
  /* const dada = this.firestore.collection<Post>('Posts').snapshotChanges()
  .pipe(changes => {
    return changes.pipe(map(
         actions => actions.map( a => {
           const data = a.payload.doc.data() as Post;
           const id = a.payload.doc.id;
           console.log(id, '--------', data);
           return{id, ...data};
         })
       ))}
  ); */

  /*muestro algo pero no es necesario (ni anda) ****** 
  const dada = this.firestore.collection<Post>('Posts')
  .snapshotChanges()
  .pipe(map (
         actions => actions.map( a => {
           const data = a.payload.doc.data() as Post;
           const id = a.payload.doc.id;
           console.log( '----- document---');
           console.log(id, '--------', data);
           return{id, ...data};
         })
       )); */

       //******* */ *** son los mismos o se muestra lo mismo *******
  /* const cef3 =  this.firestore.collection('User')
    .snapshotChanges()
      .pipe();
  const miRef = db.collection('User');

  Object.keys(miRef).map((k) => { 
    console.log('MAP ' , k ); });

  Object.keys(firebase.firestore().collection('lala')).map((k) => {
    console.log(`KEY ${k}`);
  }); */
  // ************* Termina son los mismos o se muestra lo mismo **************

  /* otra */
  /* const dato2 = async value => await (await db.collection('User').get())
    .docs[0].data();
  Object.keys(dato2).map(k => {console.log('Feni ' ,  k); }); */

  /* console.log('USUARIO- ' ,  this.firestore.collection('User'));
  console.log('REF- ' ,  firebase.storage().ref().bucket); */
  console.log('REF00- ' ,  firebase.storage().ref()); 
  console.log('REF11- ' ,  firebase.storage().ref().bucket); 
  console.log('REF22- ' ,  `${environment.firebaseConfig.databaseURL}Posts.json`); 
  //const referenciaDePost1 = `${environment.firebaseConfig.databaseURL}Posts.json`;
  /*-------  muestra solo Id de firebase del objeto Post/ ---------*/
  /* this.http.get<Post>(referenciaDePost1)
    .subscribe(posts => {
      Object.keys(posts).map((k) => {
        // const blob = new Blob([JSON.stringify(Post)], {type : 'application/json'});
       // console.table([ k]);
       console.log('ID de Post ' + k );
      });
  }, () => {
      alert ('NADA post');
    }); */

 // *******          lo mismo que arriba
  /* this.http.get<Post>(referenciaDePost1)
  .subscribe((pos) => {

    for (const key in pos) {
      if (Object.prototype.hasOwnProperty.call(pos, key)) {
        const element = pos[key];
        console.log('IDD post ' , key, ' Name ', element.title);
      }
    }
  }); */

   
    /* ----------------------------------------------------------- */
 // aca es lo mismo que arriba pero creo un Post, despues mandaba post2 o loadPost
  /* this.http.get<Post>(referenciaDePost1)
  .subscribe((posts) => {
    for (const key in posts) {
      if (Object.prototype.hasOwnProperty.call(posts, key)) { // dice que, si tiene prop key
        const element = posts[key];
        const id = element.id;
        const titulo = element.title + '';
        const content = element.content + '';
        const imageUrl = element.imageUrl + '';
        const neePst: Post = new Post (id, titulo, content, imageUrl);
        this.posts2.push(neePst); 
        
        console.log('***', element.title, '/ ', id, '/ ', titulo, '/ ', content, '/ ', imageUrl);
      }
    }    
  });*/
 
 /* **************        IMPORTANTE    ****************************
      el subscribe de abajo no es necesario si usamos el rteurn,
      que devuelve un observble y lo subscribimos en el componente
       ni tampoco necesitariamos subject pues existe solo un componente interesado
  *******************************************************************************/
/* --------------------- USU -------------------------------------- */
  /* this.http.get<User>(referenciaDeUsuario)
  .subscribe((usus) => {
    for (const key in usus) {
      if (Object.prototype.hasOwnProperty.call(usus, key)) {
        const element = usus[key];
        console.log('USUS ' , element.name , 'con id = ' , key );
      }
    }
  });

  this.http.get<User>(referenciaDeUsuario)
  .subscribe((dato) => {
    Object.keys(dato).map((k) => {
      console.log('Dato de Usuario ' + k );
    });
  }, () => {
      alert ('NADA usus');
    }); */
 /* ----------------FLY------------------------------------------- */
/*   this.http.get(referenciaDeFly)
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
    }); */
    /* ----------------------------------------------------------- */

}
    /*............... Termina  getTodosPost   .........................*/

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

   /* **************   consulta get  ********************/
   /*  const cef3 =  this.firestore.collection('User').snapshotChanges().pipe();
  const miRef = db.collection('User'); 
  return this.http.post<Post>(this.cadena, body, httpOptions)*/

   getById(valorid: number, operador: string) { /*  operador: '<'|'>'|'==' */
   alert('Operador ' + operador + ' y id es ' + valorid);
    const db = firebase.firestore();
    // Create a reference to the Posts collection
    const postsRef = db.collection('Posts');
    console.log('Referencia ID ', this.db.collection('Posts').id);
    console.log('Referencia WERE ', this.db.collection('Posts').where('id', '==' , valorid));
    console.log('Referencia Order ', this.db.collection('Posts').orderBy('name'));
    console.log('Referencia db ', this.db,
    /* 
    Object.keys(firebase.firestore().collection('lala')).map((k) => {
    console.log(`KEY ${k}`); */
  'Reference from our storage ', firebase.storage().ref().bucket,
  'Collection: ', postsRef);
    return db.collection('Posts'), ref => {
      ref.where('id', operador, valorid); };
    throw new Error('Method not implemented.');
    
  }
  
  getByNombre(name: string): any  {
    const db = firebase.firestore();
    // Create a query against the collection
    console.log('queryRef  ', db.collection('Posts'));
    return db.collection('Posts'),ref => {
      ref.where('title', '==', name);
  }
}
  
  /* *******************   DELETE   ************************* */

  /* const referenciaDePost1 = `${environment.firebaseConfig.databaseURL}Posts.json`;

  this.http.get(referenciaDePost1)
  .subscribe(dat => {
    Object.keys(dat).map((elId) => {
      console.log('ID from BD  ' , elId);
     });
    }); */

  delete(id: number): boolean {
    // abajo Elimina del array el post2 seleccionado
    // this.posts2 = this.posts2.filter(h => h !== h.id);

    if (this.posts2.splice(id, 1)) {
      this.onChange.next(this.posts2.slice());
      return true;
    }
    return false;
  }

  deletePost3(pos: Post) {
    // return this.postCollection.doc(post.title).delete();
    console.log();
    
    this.postCollection.doc(pos.IdFirebase).delete();
    // this.onChange.next(this.postCollection);
  }

  deletePost4(pos: Post): boolean {
    const index = this.loadedPosts.indexOf(pos);
    alert(index + ' -index');
    if (index > -1 ) {
      this.loadedPosts.splice(index, 1);

      this.onChange.next(this.loadedPosts.slice());
      return true;
    }
    return false;
  }
miDelet(Poo:Post) {
  console.log(firebase.firestore().collection('Posts').doc(Poo.IdFirebase).delete(), 'ID ', Poo
  .IdFirebase);
  return this.firestore.collection('Posts')
    .doc(Poo.IdFirebase)
      .delete()
      .then(() => {
        console.log('Documento eliminado!');
      }, (error) => {
        console.error(error);
      });
  
}

// DELETE: delete from the server firebase
  deletePost5(pos?: Post): Observable<Post> {
    const name = typeof pos === 'string' ? pos : pos.title;
    const id = typeof pos === 'string' ? pos : pos.IdFirebase;
    const url = `${environment.firebaseConfig.databaseURL + 'Posts.json'}/${id}`; // NO ANDA
    const url2 = `${environment.firebaseConfig.databaseURL + 'Posts'}/${id}`;
    const url3 = `https://angularcourse-bc12b.firebaseio.com/Posts/-MLSimYvqBZBOsjR1Pt2`;
    const cadena = environment.firebaseConfig.databaseURL + 'Posts.json'; // Esta no tiene el id
 /* 
      mixInfo() {
this.userService.mixInfo().subscribe(r => {
  r.forEach(user => {
    const id = user.payload.doc.id;
    const data = <UserInterface>user.payload.doc.data();
    const { name, email, password, role } = data;
    this.userService.editUser(id, { id, name, email, password, role })
    this.getUsers();
  });
});
 */
    console.log(`DELETE name-- ${name} id--${id} url-- ${url}` );
    console.log(`DELETE name-- ${name} id--${id} url-- ${url2}` ); // esta esta bien
    console.log(`url name-- https://angularcourse-bc12b.firebaseio.com/Posts/-MLSimYvqBZBOsjR1Pt2` ); // esta esta bien

    /* let dato = '';
    this.http.get<Post>(this.cadena)
      .subscribe(posts => {
        Object.keys(posts).map((k) => {
          console.log('ID de Post ' + k);
          if (posts.IdFirebase === k) {
            alert('SI');
          } else {
            alert('NO');
          }
        });
      }); */

      const rooms = [];

      const snapshot = this.db
        .collection("Post3s")
        .orderBy("title", "desc")
        .get();

        
        
        
        /* .then(() => {
          console.log('ELIMINADO');
        }, (error) => {
          console.log('ERROR');
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
      console.log(`snap , ${snapshot}`);
      
      /* snapshot.forEach(doc => {
        let room = doc.data();
        room.id = doc.id;
        rooms.push(room);
      }); */

     const httpOptionsPost = {
        headers: new HttpHeaders({ 'Content-Type': 'Posts/json' })
      };

    // return this.http.delete<Post>(cadena + id + httpOptionsPost)
    return this.http.delete<Post>( `${url2}`)
      .pipe(
      tap(_ => {
         console.log(`Yes i can deleted post id=${id}`);
         alert(`deleted post id=${id}`);
         this.onChange.next(this.loadedPosts.slice());
          
        // return this.loadedPosts; 
      }),
      catchError(this.handleError<Post>('NO can delete post'))
    ); 

  }
/*
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'User/json' })
  }; */

  deletePost(post: Post): Observable<Post> {
  /* deletePost(post: Post): Observable<Post> { */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // return this.http.delete<Post>(this.cadena + post.title, httpOptions)
  /*  const id =  this.http.get<Post>(this.cadena+post.IdFirebase)
   .subscribe((dato) => {
     alert
   }) */
// const url = `${environment.firebaseConfig.databaseURL + 'Posts.json'}/${id}`;
    console.log(`DELETE name-- ${post.title} id--${post.IdFirebase}` );
   // return this.http.delete<Post>(`${this.cadena}/${post.IdFirebase},httpOptions`)
   // // return this.http.delete<Post>(this.cadena + post.IdFirebase , httpOptions)
    return this.http.delete<Post>(this.cadena + post.IdFirebase , httpOptions)
     /*  .pipe(
      tap(_ => {
         console.log(`Yes i can deleted post id=${post.IdFirebase}`);
         alert(`deleted post id=${post.IdFirebase}`);
         this.onChange.next(this.loadedPosts.slice());
         // return this.loadedPosts;
      }),
      catchError(this.handleError<Post>('NO can delete post'))
    ); */
     
      // .pipe(map((data: any) => data));
     // .pipe(map((data: [string]) => data));
  }
  /* this.http.get<Post>(referenciaDePost1)
    .subscribe(posts => {
      Object.keys(posts).map((k) => {// const blob = new Blob([JSON.stringify(Post)], {type : 'application/json'});
       // console.table([ k]);
       console.log('ID de Post ' + k );
      });
  }, () => {
      alert ('NADA');
    }); */

  deleteAll() {
    return this.http.delete<Post>(this.cadena);
    this.onChange.next(this.loadedPosts.slice());
// etste caso retorna obesrvable asi que me suscribo en el componente que lo llama
  }

  deleteAll2() {
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

  /*----------- UPDATE or EDIT   ------------------*/

  // updatePost(id: number, postInfo: { title: string, contenido: string }): void {
  updatePost(id: number, post: Post, image?: any, IdFirebase?: string) {
    let res = this.loadedPosts.find(
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
          image,
          );
          // IdFirebase
        // this.onUploadAllImag(post, image);
        // this.add(post);
        this.onCreatePost(body);
      } else {
        alert(' service_updatePost ' + post.toString());
        res = post;

        return this.http.post(this.cadena, res)
          .subscribe(resp => {
            console.log(resp + 'RESPUESTA updatePost');
            /* informamos a otros componentes del cambio en la copia de la matriz, que dessuscribo en el comp a usar*/
            this.onChange.next(this.loadedPosts.slice());
            this.viewPost.next(res);
          }, () => {
            alert('NO');
          });
        }
      } else {
        alert('no find id posts ');
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

  /* 
  INVENTO
  const db = firebase.firestore();
      const uid = userData?.uid;
      if (uid) {
        const userRef = await db.collection('users').doc(uid);
        const user = await userRef.get();
        const userFields = user.data();
        console.log('userFields is: ', userFields);
        const {profilePicture, userName} = userFields;
        console.log('profilePicture is: ', profilePicture);
        console.log('userName is: ', userName);
        setUserInfo(() => {
          return {
            profilePicture,
            userName,
          }
        });
        */
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
  pruebaGuardarajugador(datoJugador: {
      // console.log(`**** refStorage  ${refStorage.child[0].title}`);
      // console.log(`**** task  ${task}`);
      first: string; last: string; born: number;
    }) { // : Observable<any>
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

  /* ******************************* iniciar auth  ********************** */
  /* 
  // added .firestore to test firestore locally w/ emulator 
const db = firebase.initializeApp(firebaseConfig).firestore(); 

// for debugging
firebase.firestore.setLogLevel('debug')

// Uncomment the below line to use cloud functions with the emulator
firebase.functions().useFunctionsEmulator('http://localhost:5001')
// firebase.firestore().settings({ experimentalForceLongPolling: true });

// uncomment this to test firestore locally w/ emulator 
  db.settings({
    host: "localhost:8080",
    ssl: false
  }); */
// INVENTO a ver si entro en firestore
/*  const dato = firebase.firestore().doc('Posts');
  console.log(dato , 'DAI'); */

 /*  Object.keys(firebase.firestore().collection('xxx')).map((k) => {
    console.log(`KEY ${k}`);
  }); */

  //console.log(firebase.firestore().doc('Posts').collection('Posts').get());
  /* firebase.firestore().collection('Fly').doc('Paris').get()  
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  }); */
 /*  firebase.firestore().collection('Fly').where('Departeur','==','Paris').get()
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
  }); */

  /* firebase.firestore().collection('Posts').get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  }); */
  //console.log('DB= ' + citiesRef);
 
/*  
citiesRef.doc("SF").set({.doc('==')
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });

getByNombre(name: string) {
    const db = firebase.firestore();
    // Create a query against the collection
    console.log('queryRef  ', db.collection('Posts'));
    return db.collection('Posts'),ref => {
      ref.where('title', '==', name);
  } */
}
