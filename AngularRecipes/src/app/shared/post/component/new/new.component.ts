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
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

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

  uploadPercent: Observable<number>;
  imgUrl: Observable<string>; // sera Url de la imagen subida al storage
  imgParaLoad: any;
  imgParaLoadnombre = '';
  imgTimeStamp = '';

  incrementa = 10;
  incrementaString = this.incrementa.toString();
  private incremenSuscripcion: Subscription;
  pi = 3.14159265358979323846264338327950288419716939937510;
 /*  suggestedName = 'Albodiga'; */
  private postSuscripcion: Subscription;
  /* postNew: Post = {
    title: '',
    content: '',
    data: new Date(),
  }; */

  constructor(private service: PostService,
              private route: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog,
              public storage: AngularFireStorage
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

    this.incremenSuscripcion = this.service.IncrementalChange
      .subscribe(
        (ssuu) => {
          this.incrementa = ssuu;
        }
      );

      /* Aca termina On init */
  }

  private initForm() {

    this.newPost = new FormGroup({
      incremental: new FormControl(10, [Validators.required, Validators.min(4)]),
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required,
                this.notAllowName.bind(this),
                Validators.maxLength(10)]), /*  this.notTitle.bind(this),*/

      content: new FormControl('', [Validators.required,
               Validators.minLength(8)]),

      /* imagePath: new FormControl(imagePath2, [Validators.required]), */

      imagePost: new FormControl('', [Validators.required])
    });

    // muestro esos valores de ese input en consola
    this.newPost.get('id').valueChanges.subscribe(value => {console.log('Id', value); });
    this.newPost.get('title').valueChanges
      .subscribe(value => {console.log('Title' , value);
      });
    this.newPost.get('incremental').valueChanges
      .subscribe(value => {console.log('Incremental', value);
      });

  }

  onSubmit() {
    console.log
    (`${this.newPost.value.id}..${this.newPost.value.title}..${this.newPost.controls.content.value}..${this.newPost.value.imagePost}`);
    const newPost = new Post (
      this.newPost.value.incremental,
      this.newPost.value.title,
      this.newPost.controls.content.value,
      this.newPost.value.imagePost);
    alert('desde newTs' + newPost.toString());

    this.imageOriginal = newPost.imageUrl;

    this.onCreatePost(newPost);
 }
  onCreatePost(postData: Post) {

      this.service.onCreatePost(postData);

      /* .then(() => {
        console.log('Documento creado exitósamente!');

      }, (error) => {
        console.error(error);
      }); */

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
    this.postSuscripcion.unsubscribe();
    this.incremenSuscripcion.unsubscribe();
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

  ozClearPosts() {
    alert(this.loadedPosts.length + 'DATOOS desde new');
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

  handleImage(event: any) {
    /* solo usare del parametro event en console, el target,
    de aca el files y el que esta en primer lugar que es su nombre */

   console.log('sube ' , event.target.files[0], 'Todo ' , event);
   this.imgParaLoad = event.target.files[0];
   this.imgParaLoadnombre = event.target.files[0].name;
   this.imgTimeStamp = event.timeStamp;
   console.log('timeStamp ' , event.timeStamp, + '..', this.imgParaLoad);

   const idAleatorio = Math.random().toString(36).substring(2);
   const file = event.target.files[0]; // el mismo elemento imagen
   const filePath = `uploads/profileId_${idAleatorio}`; // crea una carpeta y sera la ruta
   const refStorage = this.storage.ref(filePath); // referencia

   const task = this.storage.upload(filePath, file); // con esto sube la imagen con su ruta y la imagen

    /* guarda el porcentaje de subida, no lo estoy usando, pero si lo uso en service */
   this.uploadPercent = task.percentageChanges();

    /* aca obtenemos la ruta de la imagen */
   task.snapshotChanges()
      .pipe(finalize(() => {
        this.imgUrl = refStorage.getDownloadURL();
        console.log('snapshotChanges', this.imgUrl);
      }))
      .subscribe();

   alert('Subiendo ' + this.imgParaLoadnombre + '..' + this.imgParaLoad + ' time: ' + this.imgTimeStamp);


   // elegi subir solo una imagen, pero en logged puede subir muchas
   this.service.onUploadAllImag(this.imgParaLoad);
   // this.service.uploadImag(this.imgParaLoad);
    // this.service.uploadImag2(event);
  }


  changeName(event: Event) {   // solo para mostrar el input del htmml
    this.title = (event.target as HTMLInputElement).value;
  }

  /* INVENTO INCREMENTAL como app-incrementa desde helper */
  
  restaIncremental() {
    this.incrementa --;
    this.service.IncrementalChange.next(this.incrementa);
    /* this.incrementaString = this.incrementa.toString(); */
    this.myOnTouch();
    this.myOnChange(this.incrementa);
    console.log(this.incrementa);
 }

  sumaIncremental() {
   this.incrementa ++;
   this.service.IncrementalChange.next(this.incrementa);
    /* this.incrementaString = this.incrementa.toString(); */

   this.myOnTouch();
   this.myOnChange(this.incrementa);

   console.log(this.incrementa);
}
  myOnChange = (_: any) => {};  // es una funcion vacia que recibe un valor any
  myOnTouch = () => {};  // es una funcion vacia que NO recibe un valor any



    /* RELOJ */
    /* <span id="liveclock" 
      style="position:absolute;left:0;top:0;">
    </span> */

    show5() {
      const Digital = new Date();
      let hours = Digital.getHours();
      let minutes = Digital.getMinutes();
      const seconds = Digital.getSeconds();

      const dn = 'PM'
      if (hours < 12) {
        const dn = 'AM';
      }
      if (hours > 12) {
        hours = hours - 12;
      }
      if (hours === 0) {
        hours = 12;
      }

      /* if (minutes<=9) {
      minutes="0"+ minutes;
      }
      if (seconds<=9)
      seconds="0"+seconds */

      /* termina reloj  */
    }
}
