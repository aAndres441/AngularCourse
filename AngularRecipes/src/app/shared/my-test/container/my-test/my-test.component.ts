import { Component, OnInit, ViewEncapsulation, SimpleChanges, Input, ViewChildren, ContentChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-test',
  templateUrl: './my-test.component.html',
  styleUrls: ['./my-test.component.css'],
})
export class MyTestComponent implements OnInit {

/*   @ContentChild('idParaContentChild', { static: true }) myIdContentChild: ElementRef;
 */
  todasLasComidas = [
    { type: 'Carne', name: 'Asado', content: 'a punto' },
    { type: 'Verdura', name: 'Guiso', content: 'con lentejas' },
    { type: 'Pasta', name: 'Moñitas', content: 'sin queso' }
  ];

  plantas = [{type: '', name: '', description: ''}];

  refresco1 = 'Orange crush';
  refresco2 = 'Paso de los toros';

  constructor( private router: Router) {
  }

   // tslint:disable-next-line: use-lifecycle-interface
   /* ngOnChanges(myChanges: SimpleChanges){
    console.log('ngOnChanged');
    console.log('myChanges');
   } */

  ngOnInit() {
  }
  /* onAfterContentInit(){
    alert('onAfterViewInit');
    console.log('onAfterViewInit');
    console.log('after content ' + this.myIdContentChild.nativeElement.textContent);
  } */

  /* metodos emitidos desde  hijo lista */
  addTuna(eventDatos: {name: string, desc: string}) {
    this.plantas.push({
      type: 'Tuna',
      name: eventDatos.name,
      description: eventDatos.desc
    });
  }

  addCrasa(eventDatos: {name: string, desc: string}) {
   /*  alert('name: ' + eventDatos.name); */

    this.plantas.push({
      type: 'Crasa',
      name: eventDatos.name,
      description: eventDatos.desc
    });
  }

  deletePlantasLista(eventDatos: {dato: number}) {
   /*  alert('numero: ' + eventDatos.dato); */
    this.plantas.splice(eventDatos.dato);
  }

  testBindeo() {
     /* {relativeTo: this.route} */
    /* this.router.navigate(['test', 'bindeo'], */
    this.router.navigate(['test', 'bindeo'],
   /*  this.router.navigate(['../', 'test', 'bindeo' ] */
     /* {queryParams: {algo: 'feni'},
      fragment: 'feni'
     } */
     );
  }

}


