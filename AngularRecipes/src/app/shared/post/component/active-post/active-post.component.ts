import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '../../../../../environments/environment';

import { Subscription, Observable, from } from 'rxjs';
import { Post } from '../../post.model';
import { error } from 'console';
import { PostService } from '../../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule, MatDialogConfig, MatDialog  } from '@angular/material/dialog';
import { ModalComponentComponent } from 'src/app/shared/modal/modal-component/modal-component.component';

@Component({
  selector: 'app-active-post',
  templateUrl: './active-post.component.html',
  styleUrls: ['./active-post.component.css']
})
export class ActivePostComponent implements OnInit, OnDestroy {

  postForm: FormGroup;
  private image: any;
  loadedPosts: Post[] = [];
  loadedPosts2: Observable<Post[]>;
  posts: Post[] = [];
  post: Post;
  submitted = false; // solo para cambiar valor de envio 
  editMode = false;
  title = '';
  suggestedName = 'Albodiga';
  private postSuscripcion: Subscription;
  private suscripcion: Subscription; // se suscribe para mostrarlo y desuscribir
  private viewPostSus: Subscription;
  
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

    this.initForm(); 

    // this.fetchPosts();
    // this.service.getPosts()
    this.loadedPosts = this.service. getPosts();

    this.postSuscripcion = this.service.onChange
      .subscribe(
        (ps: Post[]) => {
          this.loadedPosts = ps;
        }
      );
    
    // this.editMode = this.loadedPosts.length != null;

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

  private initForm() {
    // para cargar el form si es edit
    let title2  = '';
    let content2 = '';
    let imagePath2 = '';

    if (this.editMode) {
      this.title = 'Edit Post';
      const post2 = this.service.getPostTitle('Lemur');
      title2 = post2.title;
      content2 = post2.content;
      imagePath2 = post2.imageUrl;
    }

    this.title = ' New Post';
    this.postForm = new FormGroup({
      title: new FormControl(title2, [Validators.required,
      this.notAllowName.bind(this),
      Validators.maxLength(10)]), /*  this.notTitle.bind(this),*/

      content: new FormControl(content2, [Validators.required,
      Validators.minLength(8)]),

      imagePath: new FormControl(imagePath2, [Validators.required])
    });


    //#region
    /* setea valores de prueba en el form al inicio */
    this.postForm.patchValue({
      title: this.suggestedName,
      content: 'feni@gMa.com'
    }
    );    
    /* solo para mostrar valor del form*/
    this.postForm.valueChanges.subscribe(
      (valor) => console.log('El valor del form ' + valor.value)
    );
    /* solo para mostrar status del form */
    this.postForm.statusChanges.subscribe(
      (status) => console.log('El status del form ' + status)
    );
    //#endregion
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
    this.postSuscripcion.unsubscribe();
    this.viewPostSus.unsubscribe();
  }

  onSubmit() {
    // this.editMode = false;
    console.log(this.postForm.value + 'Enviando1 onSubmit');
    const newPost = new Post (
      this.postForm.value.title,
      this.postForm.controls.content.value,
      this.postForm.value.imagePath);
      
    if (!this.editMode) {
      this.onCreatePost(newPost);    
      this.postForm.reset();
    } else {
      this.onEditPost(newPost);
    }
    // this.onCancel();
 }

  onEditPost(newPost: Post) {
    console.log('edit ', newPost);
    
    const newPost2 = new Post( 'Lemur', 'Violeta', 'amdr@.com');
   /*  const body = {
      first: datJugador.first,
      last: datJugador.last,
      born: datJugador.born
    }; */
    // this.service.edit(newPost2);
    this.service.updatePost(44, newPost);
  }

 onCancel() {
  alert('// this.fgNew.reset();');
  this.router.navigate(['../login'], {relativeTo: this.route});
}
  onCreatePost(postData: Post) {
    // Send Http request POST // , this.image  
      this.openDialog();
      this.service.onCreatePost(postData);
     /* .subscribe(resp => {
      console.log(resp + 'RESPUESTA');
     }, () => {
      alert('NO');
    }); */
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = 'some data';
    const dialogRef = this.matDialog.open(ModalComponentComponent, dialogConfig);

    /* const dialogRef = this.dialog.open(ModalComponent);}); */
    dialogRef.afterClosed()
      .subscribe(res => {
        console.log(`result ${res}`);

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
    this.service.fetchPosts()
    .subscribe(pss => {      
      alert ('SII' + pss.toString());
    }, () => {
        alert ('NADA');
      });
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
          resolve({tituloInvalido: true});
        } else {
          resolve (null);
        }
      }, 1500 );
    });
    return result;
  }

  notAllowName(control: FormControl ): {[s: string]: boolean} {
    if (control.value === 'Test') {
      return {noName : true};
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

}
