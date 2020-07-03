import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subscription, Observable } from 'rxjs';
import { Post } from '../../post.model';
import { error } from 'console';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-active-post',
  templateUrl: './active-post.component.html',
  styleUrls: ['./active-post.component.css']
})
export class ActivePostComponent implements OnInit, OnDestroy {

  postForm: FormGroup;
  loadedPosts = [];
  posts: Post[] = [];
  post: Post;
  submitted = false; // solo para cambiar valor de envio 
  
  suggestedName = 'Albodiga';

  private suscripcion: Subscription; // se suscribe para mostrarlo y desuscribir
  
  postNew: Post = {
    title : '',
    content: '',
    data: new Date(),
  };
  


  constructor(private http: HttpClient,
              private firestore: AngularFirestore,
              private service: PostService
              ) { }

  ngOnInit() {
    // this.fetchPosts();
this.service.getPosts().su


    console.log('Fier ' + this.firestore.doc.name);
    console.log('ee ' + this.loadedPosts.length);
     

    // this.submitted = false; // solo para cambiar valor de envio  

    this.postForm = new FormGroup({
            title: new FormControl (null, [Validators.required,
                                   /*  this.notTitle.bind(this),*/
                                    this.notAllowName.bind(this) ]),
            content: new FormControl (null, [Validators.required])
    });

    this.postForm.patchValue({
      title: this.suggestedName,
      content: 'feni@gMa.com'
    }
    );

    /* solo para mostrar */
    this.postForm.valueChanges.subscribe(
      (valor) => console.log ('El valor del form ' + valor)
    );
    
    /* Solo para inventar Subject */
    this.suscripcion = this.service.randomSub
      .subscribe(
        (s) => {
          this.submitted = s;
        }
      );
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  onReactivo() {
    alert (this.postForm.controls.title.value);
    alert (this.postForm.controls.content.value);
    this.postForm.reset();
    alert('FENIX');
 }
  
  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData + 'onCreatePost');
    // Send Http request
    this.http.post('https://angularcourse-bc12b.firebaseio.com/.Posts.json', postData)
    .subscribe(responde => {
      console.log(responde);
    }, () => {alert('ERROR'); }
    );
  }

   // nueva solicitud obtener envios
  public onFetchPosts() {

    // Send Http request
    this.fetchPosts();
  }

  
  onClearPosts() {
    alert(this.loadedPosts.length + 'DATOOS');
    // Send Http request
  }

  fetchPosts() {
    this.http.get('https://angularcourse-bc12b.firebaseio.com.Posts.json')
    .subscribe(posts => {
      console.log(posts);
      this.loadedPosts.push(posts);
    });
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

}
