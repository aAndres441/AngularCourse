import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-count-click',
  templateUrl: './count-click.component.html',
  styleUrls: ['./count-click.component.css']
})
export class CountClickComponent implements OnInit {

  refe = '';
  @ViewChild('datoHtml') desdeHtml: ElementRef; // variable desde html
  name = '';
  email = '';
  countClicks = 0;
  @ViewChild('btnIncrement') elBtn: ElementRef; // variable desde html

@HostListener('click', ['$event.target'])
  onClick(btn) {
  alert(btn + 'numero:' + this.countClicks + 5);  // escucha del dom y aumenta
}
@HostListener('mouseenter') mouseover(data: Event) {
  this.renders.setStyle(this.elRef.nativeElement, 'backgroundColor', 'yellow');
}

  constructor( private renders: Renderer2, private elRef: ElementRef ) { }

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

