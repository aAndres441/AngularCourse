import { Injectable } from '@angular/core';
import { Post } from '../../shared/post/post.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  /* para ej tutorial */
  private loadedPosts: Post[] = [];
  private postCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  
  private posts2: Post[] = [
    new Post ( 'JOrge', 'Caminante' ),
    new Post ( 'clock', 'In two binding'),
    new Post ( 'Lemur', 'In my mind')
  ];

  onChange = new Subject<Post[]>();
  randomSub = new Subject<boolean>();

  private cadena = environment.firebaseConfig.databaseURL + 'posts.json';
  private cadena2 = environment.firebaseConfig.databaseURL + 'jugadores.json';
  public db = firebase.firestore();
  // Get a reference to the storage service, which is used to create references in your storage bucket
  storage = firebase.storage();
  // Create a storage reference from our storage service
  storageRef = this.storage.ref();
  

  constructor(private http: HttpClient,
              private firestore: AngularFirestore,
              private readonly afs: AngularFirestore) {
    /*  this.postCollection = this.firestore.collection('posts');
     this.posts = this.postCollection.snapshotChanges()
       .pipe(changes => {
         return changes.pipe( ps => {
           const data = ps.toPromise;
           data.title = ps.payload.doc.title; 
           return data;
         })
       }); */
      const miCadena = environment.firebaseConfig.databaseURL;
      const blob = new Blob([JSON.stringify(miCadena, null, 2)], {type : 'application/json'});

      /* ejemplo tutorial */
      this.postCollection = afs.collection<Post>('posts');
      this.posts = this.postCollection.snapshotChanges()
       .pipe(map(
         actions => actions.map( a => {
           const data = a.payload.doc.data() as Post;
           const id = a.payload.doc.id;
           return{id, ...data};
         })
       ))
       /* termina ej tutorial */;
  }
/*const inicio = AngularFireModule.initializeApp(environment.firebaseConfig);*/

  pruebaGuardarajugador(datJugador) { // : Observable<any>

    /* VALE*/
     this.http.post(this.cadena2, datJugador).subscribe(resp => {
       }, () => {
        alert('NO');
      }); 
      
    /* NO ANDA
    const httpOptins = {
      headers: new HttpHeaders({ 'Content-Type': 'fenix/json' })
    };
    const body = {
      first: datJugador.first,
      last: datJugador.last,
      born: datJugador.born
    };
    if (datJugador.first) {
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

  getNameDatabase() {
    console.log();
  }

  getDatabaseDatas() {
    return this.firestore.collection.length;
  }
  getLosPosts() {
    return this.posts2[0].content;
  }

  /* ************************************** */
onCreatePost(postData: { title: string; content: string }) {
  // Send Http request POST 
  this.createPost(postData);
}
private createPost(postData: { title: string; content: string; }) {
 // console.log('RESPUESTA 1----- ' + firebase.storage().ref.name);
  this.http.post(this.cadena, postData).subscribe(resp => {
     }, () => {
      alert('NO');
    });
  this.onChange.next(this.loadedPosts.slice());
  /* this.http.post(environment.firebaseConfig.databaseURL, postData)
    .subscribe(resp => {
      console.log(resp + 'RESPUESTA');
    }, () => {
        alert('NO');
      }); */
}

fetchPosts() {
  /* this.http.get('https://angularcourse-bc12b.firebaseio.com.Posts.json') */
  // this.http.get(environment.firebaseConfig.databaseURL)
  return this.http.get(this.cadena);
   /*  .subscribe(posts => {
      this.loadedPosts.push(...posts[0]);
      alert ('SII lLArgo ' + this.loadedPosts[0].content);
      this.onChange.next(this.loadedPosts.slice());
      // return this.getPosts();
  }, () => {
      alert ('NADA');
    }); */
  /* this.onChange.next(this.loadedPosts.slice()); */
  // return this.loadedPosts;
  // return this.getPosts();
}


/* ******************************************** */

  getPosts(): Post[] {
    /* getPosts(): Observable<Post[]> { */
     this.fetchPosts();
    // console.log();


    // alert('LArgo2 ' + this.loadedPosts.length);
     return this.loadedPosts.slice();

    /* this.http.get(environment.firebaseConfig.databaseURL + 'posts') */
    /*  this.http.get(environment.firebaseConfig.databaseURL)
     
     .pipe(map(
       (data: Post[]) => { this.posts.push( ...data); })
     );
     return this.posts.slice(); */
  }

  /* para ej tutorial */
  getPosts3() {
    return this.posts;
  }
  updatePost3(post: Post) {
    return this.postCollection.doc(post.title).update(post);
  }
  deletePost3(post: Post) {
    return this.postCollection.doc(post.title).delete();
  }
  createPost3(post: Post) {
    return this.postCollection.add(post);
  }
  /* termina ej tutorial */

  getPost(id: number): Post {
    return this.posts2.slice()[id];
  }

  /* getProduct(id : number): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get<Product>(environment.API_BASE + 'products/'+id , httpOptions).pipe(
      map(
          (data:Product) => data
      )
    )
  }  */
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

  updatePost(id: number, postInfo: { title: string, contenido: string }): void {
    const res = this.posts2.find(
      (p) => {
        return p.title === postInfo.title;
      }
    );
    if (res) {
      res.content = postInfo.contenido;
      /* informamos a otros componentes del cambio en la copia de la matriz, que dessuscribo en el comp a usar*/
      this.onChange.next(this.posts2.slice());
    } else {
      alert('no actialixo ');
    }
  }

  updatePost2(id: number, newPost: Post) {
    this.posts2[id] = newPost;
    this.onChange.next(this.posts2.slice());
  }

  delete(id: number): boolean {
    
    if (this.posts2.splice(id, 1)) {
      this.onChange.next(this.posts2.slice());
      return true;
    }
    return false;
  }
  deleteAll() {
    while(this.posts2.length) {
      this.posts2.splice(0, 1);
    }
    this.onChange.next(this.posts2.slice());
  }

  add(post: Post) {
    this.posts2.push(post);
    this.onChange.next(this.posts2.slice());
  }

  add2(post: Post): Observable<any> {
    const httpOptins = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const body = {
      title: post.title,
      content: post.content
    };
    if (post.title) {
      return this.http.put(this.cadena + post.title, body, httpOptins)
        .pipe(
              map((data: any) => data)
            );
      } else {
        return this.http.post<Post>(this.cadena + post.title, body, httpOptins)
          .pipe(
                map(
                  (data: any) => data)
              );
      }
  }

  deletePost(post: Post) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.cadena + post.title, httpOptions)
      .pipe(
            map(
              (data: any) => data)
          );
  }
  


}
