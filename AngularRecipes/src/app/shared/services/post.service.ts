import { Injectable } from '@angular/core';
import { Post } from '../../shared/post/post.model';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { map, tap, catchError, finalize } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class PostService {  

  /* para ej tutorial */
  private loadedPosts: Post[] = [];
  private postCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;

  filePath: string;  
  
  private posts2: Post[] = [
    new Post ( 100, 'JOrge', 'Caminante', 'https://tse3.mm.bing.net/th?id=OIP.0F55zIrLRsqZHae9hGlwSAHaEJ&pid=Api&P=0&w=304&h=171'),
    new Post ( 101, 'clock', 'In two binding', 'https://tse3.mm.bing.net/th?id=OIP.WwiZsucIqy6R4taHgUJ2CQHaHa&pid=Api&P=0&w=300&h=300'),
    new Post ( 102, 'Lemur', 'In my mind', 'https://tse1.mm.bing.net/th?id=OIP.hNOV7KRYdK93MsE6SXHMVQHaLH&pid=Api&P=0&w=300&h=300')
  ];

  onChange = new Subject<Post[]>();
  randomSub = new Subject<boolean>();
  viewPost = new Subject<Post>();
  logeado = new Subject<boolean>();

  private cadena = environment.firebaseConfig.databaseURL + 'Posts.json';
  private cadena2 = environment.firebaseConfig.databaseURL + 'Jugadores.json';
  public db = firebase.firestore();
  // Get a reference to the storage service, which is used to create references in your storage bucket
  //storage = firebase.storage();
  // Create a storage reference from our storage service
  //storageRef = this.storage.ref();
  storage: any;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'User/json' })
  };
  
  

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
        // this.http.put(this.cadena2, body);

      const miCadena = environment.firebaseConfig.databaseURL;
      const blob = new Blob([JSON.stringify(miCadena, null, 2)], {type : 'application/json'});

      /* ejemplo tutorial */
      this.postCollection = afs.collection<Post>('Posts');
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


   /* ADD or CREATE */
 onCreatePost(postData ?: Post) {  
  // Send Http request POST 
  this.createPost(postData);
  this.add(postData);
}

createPost(postData: Post) {  
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
        .pipe(
              map((data: any) => /* alert(`${data}SII`)) */ alert('Si'))
            );
      } else {
        return this.http.post<Post>(this.cadena + post.title, body, httpOptins)
          .pipe(
                map(
                  (data: any) =>/*  alert(`${data}NO`)) */  alert('noo'))
              );
      }
  }

/* ******************************************** */
/* GET */

getDatabaseDatas() {
  return this.firestore.collection.length;
}

getPosts(): Post[] {
  /* getPosts(): Observable<Post[]> { */

  // this.fetchPosts();
   return this.loadedPosts.slice();

  /* this.http.get(environment.firebaseConfig.databaseURL + 'Posts') */
  /*  this.http.get(environment.firebaseConfig.databaseURL)
   .pipe(map(
     (data: Post[]) => { this.posts.push( ...data); })
   );
   return this.posts.slice(); */
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
    return this.http.get<Post>(environment.firebaseConfig + 'Post/' + id , httpOptions).pipe(
      map((data: Post) => data)
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

  /* DELETE */

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

/** DELETE: delete from the server */
  deletePost5(pos?: Post): Observable<Post> {
    const id = typeof pos === 'number' ? pos : pos.title;
    const url = `${environment.firebaseConfig.databaseURL + 'Post.json'}/${id}`;

    return this.http.delete<Post>(url, this.httpOptions)
      .pipe(
      tap(_ => console.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletepost'))
    );
    this.onChange.next(this.posts2.slice());
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
        // this.uploadImag(post, image);
        // this.add(post);
        this.onCreatePost(body);
      } else {
        alert(res.toString() + ' pppp ' + post.toString());
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
      }}
  /*  updatePost4(post: Post, image?: any) {
    if (image) {
      alert('updatePost4 RRR');
      // this.uploadImag(post, image);
      this.add(post);
    } else {
      alert('updatePost4 OOOO');
      // return this.postCollection.doc(post.title).update(post);
      return this.add(post);

    }
  } */
 
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

/*   updatePost2(id: number, newPost: Post) {
    this.posts2[id] = newPost;
    this.onChange.next(this.posts2.slice());
    this.viewPost.next(newPost);
  } */

 
 /*  uploadImag(post: Post, image: any): void {
    this.filePath = `image${image.name}`;
    alert('Ala imagen + ' +   this.filePath);
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownload().subscribe(url => {
            this.downloadUrl = url;
            this.savePost(post);
          });
        }) ).subscribe();
  } */
  
  
  /* JUGADORES */
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

  /* 

createPost(postData: Post) {  
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

}
