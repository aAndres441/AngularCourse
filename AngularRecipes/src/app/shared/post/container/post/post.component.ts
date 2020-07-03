import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../../post.service';
import { Post } from '../../post.model';

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
              private service: PostService) { }
  
  ngOnInit() {
    this.postSubscription = this.service.onChange
      .subscribe(
        (pst: Post[]) => {
          this.posts = pst;
          console.log(pst);
          alert(pst+ '***<<.');
        }
      );

    this.posts = this.service.getPosts();
    this.editMode = this.posts != null;
    console.log( this.posts);
    
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

}
