import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '../../../../../environments/environment';

import { Subscription, Observable, from } from 'rxjs';
import { Post } from '../../post.model';
import { error } from 'console';
import { PostService } from '../../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalComponentComponent } from 'src/app/shared/modal/modal-component/modal-component.component';

@Component({
  selector: 'app-active-post',
  templateUrl: './active-post.component.html',
  styleUrls: ['./active-post.component.css']
})
export class ActivePostComponent implements OnInit, OnDestroy {

  postForm: FormGroup;
  imageNew: any;
  imageOriginal: any;
  @Input() postInput: Post;  // recibira desde Modal dialogo
  loadedPosts: Post[] = [];
  loadedPosts2: Observable<Post[]>;
  // posts: Post[] = [];
  // post: Post;
  submitted = false; // solo para cambiar valor de envio
  editMode = false;
  title = ' New Post';
  suggestedName = 'Albodiga';
  private postSuscripcion: Subscription;
  private suscripcion: Subscription; // se suscribe para mostrarlo y desuscribir


  /* postNew: Post = {
    title: '',
    content: '',
    data: new Date(),
  }; */

  constructor(private http: HttpClient,
              private firestore: AngularFirestore,
              private service: PostService,
              private route: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog
  ) { }

  ngOnInit() {

    this.editMode = this.postInput != null; // editMode sera true si hay postInput
    // this.editMode = this.loadedPosts.length != null;
    // alert(this.editMode + ' : after changed edit Mode');

    this.imageNew = this.postInput.imageUrl;
    this.imageOriginal = this.postInput.imageUrl;

    this.initForm();
    this.initValuesForm();
    this.loadedPosts = this.service.fetchPosts();

    this.postSuscripcion = this.service.onChange
      .subscribe(
        (ps: Post[]) => {
          this.loadedPosts = ps;
        }
      );

    // console.log('ActivePostComponent1 ' + this.firestore.doc);
    // console.log('ActivePostComponent2, length=  ' + this.service.getDatabaseDatas());

    // this.submitted = false; // solo para cambiar valor de envio

    /* Solo para inventar Subject random*/
    this.suscripcion = this.service.randomSub
      .subscribe(
        (s) => {
          this.submitted = s;
        }
      );

    /* Aca termina On init */
  }

  private initValuesForm(): void {
    this.postForm.patchValue({
      id: this.postInput.id,
      title: this.postInput.title,
      content: this.postInput.content,
      imagePost: this.postInput.imageUrl
      //  no va la imagePath: pues depende si trae o no y yo se la cargo con handle
    });
  }

  private initForm() {
    this.title = `Edit  ${this.postInput.title}`;

    const postt: Post = this.service.getPostTitle(this.postInput.title);

    this.postForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required,
          this.notAllowName.bind(this),  // no usara Test
          Validators.maxLength(14)]), /*  this.notTitle.bind(this),*/
      content: new FormControl('', [Validators.required,
          Validators.minLength(8)]),
      imagePost: new FormControl('', Validators.required)

      /* imagePath: new FormControl(imagePath2, [Validators.required]), */
      /* imagePost: new FormControl('', [Validators.required]), */
    });

    //#region
    /* setea valores de prueba en el form al inicio */
    /*  this.postForm.patchValue({
       title: this.suggestedName,
       content: 'feni@gMa.com'
     }
     ); */

    /* solo para mostrar valor del form*/
   /*  this.postForm.valueChanges.subscribe(
      (valor) => console.log('El valor del del form  active component ' + valor.value)
    ); */
    /* solo para mostrar status del form */
    this.postForm.statusChanges.subscribe(
      (status) => console.log(`El status del form  active component ${status}`)
    );
    //#endregion
    /* } */
  }

  onSubmit() {

    console.log(this.postForm.value + 'Enviando1 onSubmit');
    alert(this.postForm.statusChanges + '.statusChanges onSubmit');
    const newPost = new Post(
      this.postForm.value.id,
      this.postForm.value.title,
      this.postForm.controls.content.value,
      this.postForm.value.imagePost);
      // this.imageOriginal) ;

   // this.imageOriginal = newPost.imageUrl;

    if (!this.editMode) {
      this.onCreatePost(newPost);
      this.postForm.reset();
    } else {
      this.onEditPost(newPost);
    }
    // this.onCancel();
  }

  /* ---- EDIT  ---- */
  private onEditPost(newPost: Post) {
    alert('EDIT');
    console.log('IMG new ' + this.imageNew);
    console.log('IMG Original' + this.imageOriginal);
    console.log('Itityle' + this.title);

 /* es por si no tiene imagen
 Si imagen que agrego con handle es igual a original del init, le asigna original.
 pero si no pasa al else para el nuevo post*/

    if (this.imageNew === this.imageOriginal) {
      newPost.image = this.imageOriginal;
      alert('misma img');
      this.service.updatePost(newPost.id , newPost);
    } else {
      alert('otra img ');
      this.service.updatePost(newPost.id, newPost, this.imageNew);
    }

    // this.service.updatePost2(newPost);
  }

  ngOnDestroy(): void {
    // this.suscripcion.unsubscribe();
    this.postSuscripcion.unsubscribe();
  }

  onCancel() {
    alert('// this.fgNew.reset();');
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
  onCreatePost(postData: Post) {
    alert('CREATE');
    // Send Http request POST // , this.image
    // this.openDialog();
    this.service.onCreatePost(postData);
    /* .subscribe(resp => {
     console.log(resp + 'RESPUESTA');
    }, () => {
     alert('NO');
   }); */
  }

  openDialog(post?: Post): void {
    const config = new MatDialogConfig();
    config.data = {  // veremos que el if en dialog depende de data, inyectado en const dialogo
      ID: 22,
      title: 'Vamos Fenix',
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

    /* const dialogRef = this.dialog.open(ModalComponent);}); */
    dialogRef.afterClosed()
      .subscribe(res => {
        console.log(`result ${res}`);
        alert(' result ' + res);

      });
  }

  /* promisePrueba = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve ('Asynchronous');
        }, 3500);
    }); */

  public onFetchPosts() {
    // Send Http request GET
    this.fetchPosts();
  }

  private fetchPosts() {
      if (this.service.fetchPosts()) {
        const post: Post[] = this.service.fetchPosts();
        alert('SI');
      } else {
        alert('NO');
      }
  }
  /*  this.postSuscripcion = this.service.onChange
      .subscribe(
        (ps: Post[]) => {
          this.loadedPosts = ps;
        }
      ); */


  notTitle(controler: FormControl): Promise<any> | Observable<any> {
    const result = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (controler.value === 'New') {
          resolve({ tituloInvalido: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return result;
  }

  notAllowName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { noName: true };
    }
    return null;
  }

  onClearPosts() {
    alert(this.loadedPosts.length + 'DATOOS');
    // Send Http request
    this.service.deleteAll();
  }

  delete2(hero: Post): void {
    this.loadedPosts = this.loadedPosts.filter(h => h !== hero);
    this.service.deletePost(hero).subscribe();

  }

  cambiaEdit() {
    this.editMode = !this.editMode;
    alert(this.editMode + 'EDIT ');
  }

  handleImage(event: any): void {
    this.imageOriginal = event.value;
    alert(`2 Hello!!${this.imageNew}`);
  }

  toPost() {
   /*  this.router.navigate(['./'],  // '/shopping', 'list'
    {
      queryParams: { ID: 'Pepe' },
      fragment: 'loading' + 'Hello'
    }
);*/
    /* this.router.navigate(['../postEdit'], {relativeTo: this.route,
        queryParams: { ID: '1973' },
         fragment: 'Mal'}); */

         this.router.navigate(['../login'], { relativeTo: this.route });

  }

}
