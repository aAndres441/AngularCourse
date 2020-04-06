import { Directive, Input, HostListener, HostBinding, ElementRef } from '@angular/core';


/*  la estoy utilizando en test y en detail.recipe , pero anda en navBar compnent */
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  /* constructor() { } */

  @HostBinding('class.open') isOpen = false; 

  /*  HostBinding nos permite vincular 
  las prop del elem donde se coloca la Directva, 
  en este caso accedo al elem y vinculo la clase del componente para que cambie segun la prop bool*/
/* HostListener , escucho el evento click y ejecuto aca mismo un metodo que llamo toggle*/

@HostListener('click') toggleOpen(){
  this.isOpen = !this.isOpen;
}

/* este me deja cerrar haciendo click en todas partes del documento */

/* @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
  this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
} */
constructor(private elRef: ElementRef) {}

}
