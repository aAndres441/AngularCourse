import { Injectable } from '@angular/core';
import { Post } from '../../shared/post/post.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {

   posts: Post[] = [];
  private posts2: Post[] = [
    new Post ( 'JOrge', 'Caminante' ),
    new Post ( 'clock', 'In two binding'),
    new Post ( 'Lemur', 'In my mind')
  ];

  onChange = new Subject<Post[]>();
  randomSub = new Subject<boolean>();

  constructor(private http: HttpClient,
              private firestore: AngularFirestore) {
               }

  getDatabaseDatas() {
    return this.firestore.collection.length;
  }
  getLosPosts(){
    return this.posts2[0].content;
  }
  getPosts(): Post[] {
      /* getPosts(): Observable<Post[]> { */
        return this.posts2.slice();

/* this.http.get(environment.firebaseConfig.databaseURL + 'posts') */
  /*  this.http.get(environment.firebaseConfig.databaseURL)
   
   .pipe(map(
     (data: Post[]) => { this.posts.push( ...data); })
   );
   return this.posts.slice(); */
  }

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
    }
    if (post.title) {
      return this.http.put(environment.firebaseConfig.databaseURL + 'postss/' +
        post.title, body, httpOptins)
        .pipe(
              map((data: any) => data)
            );
      } else {
        return this.http.post<Post>(environment.firebaseConfig.databaseURL + 'postss/' +
          post.title, body, httpOptins)
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
    return this.http.delete(environment.firebaseConfig.databaseURL + 'post/' +
      post.title, httpOptions)
      .pipe(
            map(
              (data: any) => data)
          );
  }
  


}
