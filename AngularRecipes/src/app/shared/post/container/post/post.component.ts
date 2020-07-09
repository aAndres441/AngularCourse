import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../../../services/post.service';
import { Post } from '../../post.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  private postSubscription: Subscription;
   // Para Subject: acordarse de ondestroy y de asignar variable para desuscript
   
   posts: Post[] = [];
   editMode = false;
   randomSubject = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: PostService,
              private firestore: AngularFirestore) { }
  
  ngOnInit() {

    // console.log('PostComponent1 ' + this.firestore.doc);
   // console.log('PostComponent2, length=  ' + this.service.getDatabaseDatas());
    // console.log('PostComponent3 ' + this.service.getLosPosts());

    this.postSubscription = this.service.onChange
      .subscribe(
        (pst: Post[]) => {
          this.posts = pst;
        }
       // tt => {console.log(' **** ESTE TT ' + tt); }
      );
      
    this.posts = this.service.getPosts();
    this.editMode = this.posts != null;

    console.log( '>>> This is suscribe2 of on init ' + this.posts.length  );
    /* termina OnInit() */
  }

  ngOnDestroy(): void {
   this.postSubscription.unsubscribe();
  }
 
  onNewPost() {
   // this.router.navigate(['newPost']);
     this.router.navigate(['post/new']);
    // navega a new relativo a que ya estoy parado en recipe
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
    // navega a new relativo a que ya estoy parado en recipe
  }

  onCancel() {
    // this.fgNew.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  activarSubject() {
    this.randomSubject = (Math.floor(Math.random() * 256) % 2 === 0 ? true : false);  //  Math.random();
    this.service.randomSub.next(this.randomSubject);
  }

  getPosts(): Post[] {
    return this.service.getPosts();
    
  }

  onDelete(){}

  onAdd(){}

}
