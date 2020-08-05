import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';


import { Subscription, Observable, from } from 'rxjs';
import { Post } from '../../post.model';
import { PostService } from '../../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule, MatDialogConfig, MatDialog  } from '@angular/material/dialog';
import { ModalComponentComponent } from 'src/app/shared/modal/modal-component/modal-component.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {

  newPost: FormGroup;
  imageNew: any;
  imageOriginal: any;
  @Input() post: Post;  // recibira desde Modal dialogo
  loadedPosts: Post[] = [];
  /* loadedPosts2: Observable<Post[]>; */
   posts: Post[] = [];
  // post: Post;
  submitted = false; // solo para cambiar valor de envio 
  editMode = false;
  title = ' New Post';
 /*  suggestedName = 'Albodiga'; */
  private postSuscripcion: Subscription;
  private suscripcion: Subscription; // se suscribe para mostrarlo y desuscribir
  private viewPostSus: Subscription;
  
  /* postNew: Post = {
    title: '',
    content: '',
    data: new Date(),
  }; */

  constructor(private service: PostService,
              private route: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog
              ) { }

  ngOnInit() { 

    this.editMode = this.post != null; // editMode sera true si hay post2
    // this.editMode = this.loadedPosts.length != null;
    
    this.initForm();

    this.postSuscripcion = this.service.onChange
      .subscribe(
        (ps: Post[]) => {
          this.posts = ps;
        }
      );
    
      /* Aca termina On init */
  }

  private initForm() {

    this.newPost = new FormGroup({
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required,
                this.notAllowName.bind(this),
                Validators.maxLength(10)]), /*  this.notTitle.bind(this),*/

      content: new FormControl('', [Validators.required,
               Validators.minLength(8)]),

      /* imagePath: new FormControl(imagePath2, [Validators.required]), */

      imagePost: new FormControl('', [Validators.required])
    });
  }
  
  onSubmit() {
    const newPost = new Post (
      this.newPost.value.title,
      this.newPost.controls.content.value,
      this.newPost.value.imagePost);

    this.imageOriginal = newPost.imageUrl;
      
   
    this.onCreatePost(newPost);
 }
  
  onCreatePost(postData: Post) {
   
      this.service.onCreatePost(postData);
     /* .subscribe(resp => {
      console.log(resp + 'RESPUESTA');
     }, () => {
      alert('NO');
    }); */
  }

  onCancel() {
    alert('// this.fgNew.reset();');
    this.router.navigate(['../login'], {relativeTo: this.route});
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
    this.postSuscripcion.unsubscribe();
    this.viewPostSus.unsubscribe();
  }

 
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

  cambiaEdit() {
    this.editMode = ! this.editMode;
    alert(this.editMode + 'EDIT ');
  }

  handleImage() {

  }

}
