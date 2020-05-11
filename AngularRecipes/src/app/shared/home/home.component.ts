import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
 
private myFirstObs: Subscription;
private myInterval: Subscription;

  constructor() { }

  ngOnInit() {

    /* Interval es un tipo de observable, obtenemos un valor por segundo y lo suscribo para mostrarlo.
     Debo desuscribirlo, por eso que guardo la suscripcion en una variable myInterval. */

    this.myInterval = interval(1000).subscribe(count => {
      console.log(count + ' yes');
    });

    // Observable personalizado
    const myCustomObs = Observable.create(observador => {
      let count = 0;
      /* creamos el observable intervalo que envuelve fuente de datos, el observador es el oyente de los cambios que pasa
      en  intervalo, en otro caso podria ser solicitud de AJAX o escuchar clicks. Que nos darian completo o errores  
      que los suscribo para pasar funciones y usar esos datos. vemos que mas abajo los suscribo y manejp errores,complete.
       Ej llamo un metodo setInterval(),
      y dentro de la funcion anonima del observador, puedo mostrar los datos o usar metodo next()
      que emite nuevo valor, error o complete y muestro esos datos
       */
      setInterval(() => {
        observador.next(count);  // le informamos a nuestro observador de los cambios.
        if (count === 3) {
          observador.complete();  // asi se detiene el observable.
        }
        if (count > 2) {
          observador.error(new Error('Count is greater 2!'));
          // le informamos a nuestro observador el error y lo mata, deja de mostara en rojo en consola
        }
        count++;
      }, 1000);
    });
  // **************************************************************************************************************** */

    /* en el observable guardamos lo datos que obtenemos y los mapeamos para devolver algo, esto lo 
        reemplazo abajo */
    /*  myCustomObs.pipe(map( unDato => {
       return 'Los datos desde pipe son: ' + unDato;
     })); */

    /* esta suscripcion la podria hacer en otros lugares para la llamada, como servicios o property
    y tambien pasamos otro argumento ademas del la funcion data para suscribirse en el error*/
  
    /* OPERADORES usado en cualquiuer observable en este ej se hace en myCustomObs llamando a metodo pipe
      importado de rxjs/operators, que puede tomar muchos argumentos juntos o sea muchos operadores
       como map, filter ... , ver en https://academind.com/  learnrxjs; separados por coma */

    this.myFirstObs = myCustomObs.pipe(  // filter(dato=>{}), map(dato=>{})
      filter(dato => {
      return dato > 1;  // retorna verdadero si ese dato de count es > 1,asi mostrara valores siguientes a 1    
    }), map(unDato => {
      return 'Los datos desde pipe en home son: ' + unDato;

    })).subscribe(  
      /* aca suscribo el observable myCustomObs para usar esos datos, como primer argumento esta el dato,
      segundo el error. */
      myDato => { console.log('Hola' + myDato); alert('my data: ' + myDato); },
      myError => { console.log(myError); alert('my error - ' + myError);
     },
      () => { console.log('COMPLETED !'); alert('COMPLETED !'); }
    );

    /*-------------  ACA TERMINA OnInit() ---------------------------*/
  }

  /* Seria asi sin pipe, ni map:
   this.myFirstObs = myCustomObs.subscribe(
        dato => {
                console.log(dato);
     },error => { console.log(error);
                alert(error.message);
    }, () => { console.log('COMPLETED !');  //este es metodo de completed, va sin argumentos ()
               alert('COMPLETED !'); }
    );  */
  
  ngOnDestroy(): void {
    this.myFirstObs.unsubscribe();
    this.myInterval.unsubscribe();
  }

}

/*  Shift+Ctrl + L */
