import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../../../services/post.service';
import { Post } from '../../post.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  private postSubscription: Subscription;
   // Para Subject: acordarse de ondestroy y de asignar variable para desuscript
   title = 'POST';
   posts: Post[] = [];
   editMode = false;
   randomSubject = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: PostService) { }
  
  ngOnInit() {
    /* para ej tutorial */
    this.service.getPosts3().subscribe(
      (ps: Post[]) => {
        this.posts = ps;
      }
    );
    console.log(`${this.posts.length}LLLL`);
    

    /* termina ej tutorial */

   /*  defaultProject = AngularFireModule.initializeApp (environment.firebaseConfig),
  console.log(defaultProject.name);  // "[DEFAULT]"
 */
    // console.log('PostComponent1 ' + this.firestore.doc);
   // console.log('PostComponent2, length=  ' + this.service.getDatabaseDatas());
    // console.log('PostComponent3 ' + this.service.getLosPosts());


    // PRUEBA PARA BORRAR FIRE
   // this.service.pruebaGuardar();

/* this.service.fetchPosts().pipe(map(
  (data: Post[]) => { this.posts.push( ...data);
     console.log(this.posts.length);})
); */

      
   /*  this.posts = this.service.getPosts();
    this.editMode = this.posts != null;
     */
    
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

  newPost() {
   // this.router.navigate(['../newpp'], {relativeTo: this.route});
    this.router.navigate(['/']);
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

  pruebaGuardarajugador() {
   /* jugador: {
      first: 'Andres',
      last: 'Arias',
      born: 1973
    } */
    const jugador = {
      first: 'Andres',
      last: 'Arias',
      born: 1973
    };
    this.service.pruebaGuardarajugador(jugador);

    /* .subscribe(
      dato=>{alert(dato+'kkk')}
    ); */
    
     /*  .then(docRef => {
      console.log('Document id ' + docRef.id);
      })
      .catch(error => {
        console.log('Error adding ' + error);
      }); */
  }

}
