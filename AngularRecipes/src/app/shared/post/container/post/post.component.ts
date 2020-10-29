import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../../../services/post.service';
import { Post } from '../../post.model';
import { map } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalComponentComponent } from 'src/app/shared/modal/modal-component/modal-component.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy, AfterViewInit {

  private postSubscription: Subscription;
   // Para Subject: acordarse de ondestroy y de asignar variable para desuscript
   title = 'POST';
   posts: Post[] = [];
   // private randomSubject = false;
   randomSubject = false;
   image: ImageData;
   post: Post;
   viewOnePost: Subscription;
   editMode = false;
   loggeado = false;
   private logSubscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: PostService,
              private matDialog: MatDialog) { }

  ngOnInit() {

     // this.editMode = this.posts != null;

    /* para mostrar si selecciono un post */
    this.viewOnePost = this.service.viewPost
    .subscribe(
      (pp: Post) => {
        this.post = pp;
      }
    );

    this.posts = this. fetchPosts();

    this.postSubscription = this.service.onChange
    .subscribe(
      (ps: Post[]) => {
        this.posts = ps;
      }
    );

    /*  defaultProject = AngularFireModule.initializeApp (environment.firebaseConfig),
    console.log(defaultProject.name);  // "[DEFAULT]"
    */

      // PRUEBA PARA BORRAR FIRE
    // this.service.pruebaGuardar();

    /* Loggeado */
    this.logSubscription = this.service.logeado
      .subscribe((res) => {
        this.loggeado = res;
      });

    alert( 'HAY ' + this.posts.length);

  } /* termina OnInit() */

  ngOnDestroy(): void {
   this.postSubscription.unsubscribe();
   this.viewOnePost.unsubscribe();
   this.logSubscription.unsubscribe();
  }

  onNewPost() {
   this.router.navigate(['postNew']);
    // navega a new relativo a que ya estoy parado en recipe
  }

  newPost() {
   // this.router.navigate(['../postNew'], {relativeTo: this.route});
    this.router.navigate(['/']);
  }

  onCancel() {
    // this.fgNew.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  activarSubject() {
    this.randomSubject = (Math.floor(Math.random() * 256) % 2 === 0 ? true : false);  //  Math.random();
    this.service.randomSub.next(this.randomSubject); // invento paraver subbmited en postActive
  }

  fetchPosts(): Post[] {
    this.posts = this.service.fetchPosts();
    return this.posts;
   //  return this.service.fetchPosts();
  }

  onDelete(ps: Post): boolean {
    /* let res : boolean; */
    confirm(`Delete ${ps.title}?`);
    this.post = null;  // para no ver imagen si esta seleccionada
    return this.service.deletePost4(ps);
  }

  deletePost5(pos: Post) {
    this.posts = this.posts.filter(h => h !== pos);
    this.service.deletePost5(pos).subscribe();
  }

  onAdd(ps?: Post) {
    // alert('onAdd component' + ps.title);
    // this.service.onCreatePost(ps);
     // arega a los de arriba tambien
    // this.router.navigate(['/postNew']);
    this.openDialog();
  }

  onEdit(epost?: Post) {
    // this.service.edit(epost);

   ///////  this.service.updatePost2(epost);

   /*  this.viewOnePost = this.service.viewPost
    .subscribe(
      (pp: Post) => {
        this.post = pp;
      }
    ); */

    // alert(this.post.imageUrl + ' la imagen desde ts');
    // this.router.navigate(['/postEdit']);
    this.service.viewPost.next(epost);

    this.openDialog(epost);
  }

  openDialog(post?: Post): void {
    const config = new MatDialogConfig();
    config.data = {  // veremos que el if en dialog depende de data, inyectado en const dialogo
      ID: 22,
      title: ' Fenix',
      message: post ? 'Editar post' : 'New post', // si hay post le mando este msg
      content: post  // si hay post le mando este content
    };
    config.autoFocus = true;
    config.disableClose = true;
    config.hasBackdrop = true;
    /* dialogConfig.minWidth = '120';
    dialogConfig.position = {
      bottom: '1',
      right: '1'} */

    const dialogRef = this.matDialog
      .open(ModalComponentComponent, config);  // siempre pasamos config (si edita o no)
    dialogRef.afterClosed()
      .subscribe(res => {
        console.log(`result ${res}`);
        alert(' result ' + res);
      });
  }
/* ///////////////  JUGADOR  ///////////////////*/
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
 /*  appliFilter(value: string){
    this.posts.filter = value.trim().toLocaleLowerCase();
  }*/

  ngAfterViewInit(): void {
    // this.posts.sort = this.sort;
  }

  irarouteredit() {
    alert('edit');
    /* this.router.navigate(['new'], {relativeTo: this.route}); */
    /* this.router.navigate(['../payment']); */
    /* this.router.navigate(['/']); */
    /* this.router.navigate(['../postEdit']); */
    this.router.navigate(['../postEdit'], {relativeTo: this.route,
        queryParams: { ID: '1973' },
         fragment: 'Mal'});
   // this.router.navigate(['/post', 'postEdit']);,


   /*   this.router.navigate(['new'], {relativeTo: this.route});
    // navega a new relativo a que ya estoy parado en recipe

    reload() {
      this.router.navigate(['home'], {
        /* relativeTo: this.route,
        queryParams: { ID: '1973' },
         fragment: 'Mal'
       }); */
  }

  viewDetail() {
    alert('viewDetail');
    this.router.navigate(['/post', 'postEdit']);
  }

  onLogin() {
    this.loggeado = true;
  }
  outLogin() {
    this.loggeado = false;
  }
  toLogin() {
    this.loggeado = !this.loggeado;
    this.service.logeado.next(this.loggeado);
  }




}
