import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private posts2: Post[] = [
    new Post ( 'title1', 'content1' ),
    new Post ( 'title2', 'content2')
  ];

  onChange = new Subject<Post[]>();
  randomSub = new Subject<boolean>();

  constructor(http: HttpClient,
              private firestore: AngularFirestore) {
                
               }

  getPosts(): Post[] {
    return this.posts2.slice();
  }

  getPost(id: number): Post {
    return this.posts2.slice()[id];
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
  
}
