import { Component, OnInit, ViewChild, ElementRef, Directive, HostListener } from '@angular/core';


//  invento agregarle @Directiva y me hace borrarla como componente y adems cambiar bombe con prefijo directive
@Directive({
  selector: '[appCounting]'
})

@Component({
  selector: 'app-count-click',
  template: '<button appCounting>Incre</button>',
  /* templateUrl: './count-click.component.html', */
  styleUrls: ['./count-click.component.css']
})
export class CountClickComponentDirective implements OnInit {

  refe = '';
  @ViewChild('datoHtml') desdeHtml: ElementRef; // variable desde html
  name = '';
  email = '';
  countClicks = 0;
  @ViewChild('btnIncrement') elBtn: ElementRef; // variable desde html
  
@HostListener('click', ['$event.target'])
  onClick(btn) {
  alert(btn + 'numero:' + this.countClicks + 5);  // escucha y aumenta
}
  constructor() { }

  ngOnInit(): void {
  }

  incre() {
    this.refe = this.desdeHtml.nativeElement.value;
    alert('refe ' + this.refe);
    this.countClicks++;
  }

  changeName1(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
    alert('name ' + this.name);
   }

  changeName2(event: string) {
    this.email = event;
    alert('email2 ' + this.email);
  }

  reset() {
    this.desdeHtml.nativeElement.value = '';
  }

  /* changeName(event: Event) {   // solo para mostrar el input del htmml
  this.title = (event.target as HTMLInputElement).value;
}

  onUserName(event: string) {
    this.userName = event;
    alert('userName2 ' + this.userName);
  } */

}
