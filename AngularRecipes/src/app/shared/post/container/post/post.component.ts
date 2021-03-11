import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, provideRoutes } from '@angular/router';
import { Observable, range, Subscription } from 'rxjs';
import { PostService } from '../../../services/post.service';
import { Post } from '../../post.model';
import { filter, map } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalComponentComponent } from 'src/app/shared/modal/modal-component/modal-component.component';
import { error } from 'protractor';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { UpperCasePipe } from '@angular/common';

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
   error = false;
   private errorSub: Subscription;
   private logSubscription: Subscription;
   isFetchingPost = false;
   private fetchingPost: Subscription;
   nameCollection = "";
   idCollection: number;
   operador: string;
   postes: Post[] = [];
   
  isActualizado = true;
  numeroUno: number;
  numeroDos: number;
  resu: number = 0;
 
  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: PostService,
              private matDialog: MatDialog) { }

  ngOnInit() {
   
    


    // Invento con filter rxjs
    const numerito: Observable<number> = range(0, 14);
    numerito.pipe(map(x => x * 3), filter(x => x % 2 === 0))
    .subscribe((y) => {
        console.log(y);
      });

     // this.editMode = this.posts != null;

    /* para mostrar si selecciono un post */
    this.viewOnePost = this.service.viewPost
    .subscribe(
      (pp: Post) => {
        this.post = pp;
      }
    );

    this.posts = this.fetchPosts();

    this.postSubscription = this.service.onChange
    .subscribe(
      (ps: Post[]) => {
        this.posts = ps;
      }
    );

    this.errorSub = this.service.elErrorSubj
    .subscribe(
      (er: boolean ) => {
        this.error = er;
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

      /* mientras carga datos de BD */
    this.fetchingPost = this.service.fetchingPost
      .subscribe((res) => {
        this.isFetchingPost = res;
      });

  } /* termina OnInit() */

  ngOnDestroy(): void {
   this.postSubscription.unsubscribe();
   this.viewOnePost.unsubscribe();
   this.logSubscription.unsubscribe();
   this.fetchingPost.unsubscribe();
   this.errorSub.unsubscribe();
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

  /* **************  GET  ****************** */
 /* Podemos suscribirnos a un return desde service del get (return this.http.get<Post>..)
  que retorna un observable de pipe sin suscribirse o
  se suscribe en el servicio si al cmponente no quiere recibir la respuesta como en Create o puede retornar el array*/

  fetchPosts(): Post[] {
    this.posts = this.service.fetchPosts();
    return this.posts;
  }

  /* **************   consulta get  ********************/
  getByNombre(name?: string) {
    let posstt: Post;
    if (this.nameCollection) {
      console.log('NAME: ' + this.nameCollection);
      // console.log(name);
       this.service.getByNombre(this.nameCollection)
        .subscribe((data) => {
          posstt = data;
          console.log('post by title: ', posstt.title);
          
        });
       this.service.deleteAll().subscribe();
       // this.service.deletePost5(pos).subscribe((dato) => {alert('SII' + dato.title)});

    } else {
      return;
    }
  }

myFilterRecip(dato: number): Post[] {
  alert('FILTRO');
  let resuelve: Post[] = [];
  if (dato > 0 && dato != null) {
  alert ('You data - ' + dato);
  for (const item of this.posts) {
    if (item.id === dato) {
      resuelve.push(item);
     }
  }
  console.log('LARGO ' , ...resuelve.map(dati => 
  { console.log(dati.title);
   }));
  
  alert ('You resuelve - ' + resuelve.length);
} else if (dato ===  null) {
  alert ('You must add data');
} else if (dato < 0) {
  alert('data is invalid');
}else{
  resuelve=this.posts;
}
  return resuelve;

  /* resuelve = this.posts.filter((rec: Post) => {
    // tslint:disable-next-line: no-unused-expression
    rec.id === dato;
  }); */
  /*  return this.posts.filter((rec: Post) => {
  rec.id === dato;
}); */
  /* myFilterRecip(filterBy: string): Recipe[] {
    filterBy = filterBy.toLocaleLowerCase();
    // throw new Error('Method not implemented.');
    return this.recipes.filter((rec: Recipe) => {
      // tslint:disable-next-line: no-unused-expression
      rec.name.toLocaleLowerCase().indexOf(filterBy) !== -1;
    }); */
    /* console.log('AVERR ', );
    console.log('Length', devolucion.length, this.idCollection);
     */
 // this.posts= devolucion;
  // devolucion = this.posts.filter(h => h !== h.id);
    // this.posts2 = this.posts2.filter(h => h !== h.id);
  /* } */
  // this.posts = this.posts.filter () this.posts[this.idCollection] === this.idCollection);
  // .pipe(map((data: [string]) => data));
/*
 const result = [];
    if (value.length === 0 || filterInput === '') {
      return value;
    }
    filterInput = filterInput.toLocaleLowerCase();
    namedata = namedata.toLocaleLowerCase();
    for (const item of value) {
      if (item[namedata] === filterInput) {
        result.push(item);
       }
    }
    return result;
  } */
}

getById() {

  if (this.idCollection === null || this.idCollection < 0) {
    alert(' ID must be >= 0' );
  }
  else if(this.idCollection===1){
    alert(' ID must be >= 1' );
   // this.posts = this.posts.filter (h => h === this.posts[this.idCollection]); //this.posts[this.idCollection], this.idCollection) //this.posts[this.idCollection]
  //  console.log('Dato ',  this.posts.map(h=>{h.id}));
    
    return this.posts;
  }
  else {
  let devolucion: Post[] = [];
  let devolucion2: Post[] = [];
  let postSlice = this.posts.slice();
  devolucion = this.posts ? this.myFilterRecip(this.idCollection) : this.posts;
  devolucion2 = postSlice ? this.myFilterRecip(this.idCollection) : postSlice;
    /* Que dice: si hay filtro aplícalo, si no devuelve todas las recetas. */
    console.log('ID COL ' , this.idCollection, 'OPERADOR', this.operador);
    console.log('Posts filter: ' , this.posts.length);
   console.log('devolucion: ' , devolucion.length);
   console.log('posts slice: ' , postSlice.length);
   
  /* if(devolucion.length>0) {
      this.posts = devolucion;
    } */
  }

    
 /*  const devolucion4: Post[] = [];
  for (const iterator of this.posts) {
    if (iterator.id === this.idCollection) {
      console.log('iterator.id ', iterator.id);
      
      devolucion4.push(iterator);
      console.log('Length de 4 ', devolucion4.length);
    } else {
      console.log('Nothing');
    }
    return devolucion4;
  } */

 // this.posts= devolucion;
/*   const devolucion3: Post[] = [];
  for (let index = 0; index < this.posts.length; index++) {
    console.log('ID ', this.posts[index].id);
    const element = this.posts[index];
    if (element.id === this.idCollection) {
      console.log('element ' , element.title, '-', element.id);
      devolucion3.push(element);
      console.log('Length ', devolucion3.length);
    }  
  } */
   /*  if(devolucion3.length){
      this.posts = devolucion3;
    } */
  /* console.log(this.idCollection, '**', this.operador);
  const devolucion2: Post[] = [];
  this.posts.forEach(element => {
    element.id === this.idCollection;
    devolucion2.push(element);
    });
  console.log('devolucion2' , devolucion2.length);
 */
  // devolucion = this.posts.filter(h => h !== h.id);
    // this.posts2 = this.posts2.filter(h => h !== h.id);

  /* } */
  // this.posts = this.posts.filter () this.posts[this.idCollection] === this.idCollection);
  // .pipe(map((data: [string]) => data));
  /* dat => {
    Object.keys(dat).map((elId) => {
      console.log('ID from BD  ' , elId);
     });*/
  //  numerito.pipe(map(x => x * 3), filter(x => x % 2 === 0))
   // this.posts = this.posts.filter(h => h !== pos);
 /*  appliFilter(value: string){
    this.posts.filter = value.trim().toLocaleLowerCase();
  }*/

  //LO MEJOR ES IR A BD Y TRAER
   return this.service.getById(this.idCollection, this.operador);

}

  /* ********   DELETE  ***************************** */
  onDelete(ps: Post): boolean {
    /* let res : boolean; */
    confirm(`Delete ${ps.title}?`);
    this.post = null;  // para no ver imagen si esta seleccionada
    return this.service.deletePost4(ps);
  }

  deletePost(pos: Post) { // delete desde BD
    confirm(`Delete ${pos.title}?`);

    // abajo Elimina del array el post seleccionado
    // this.posts = this.posts.filter(h => h !== pos);

    // estaba esta
    // this.service.deletePost5(pos).subscribe((dato) => {console.log('Fenix' + dato.title); });
   // this.service.deletePost(pos);
   /* 
    this.service.deletePost(pos)
      .subscribe((dato) => {
        console.log('Fenix' + dato.title);
      }); */
      // this.service.miDelet(pos);
     //  this.service.deletePost4(pos);

    this.service.deletePost5(pos).subscribe((dato) => {alert('SII' + dato.title)});
  }

  onDeleteAll() {
    this.service.deleteAll()
    .subscribe(() => {
      this.posts = [];
    });
  }

  /* ********   ADD & EDIT  ***************************** */
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
      content: post  // si hay post le mando este content y abre dialogo de edit
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

 mostrardatos() {
  this.service.mostrardatos();   
 }

 addInvento1(){
  this.resu = this.service.addInvento1(this.numeroUno, this.numeroDos);
 }
 addInvento2(){
  this.resu = this.service.addInvento2(this.numeroUno, this.numeroDos);
 }


}
