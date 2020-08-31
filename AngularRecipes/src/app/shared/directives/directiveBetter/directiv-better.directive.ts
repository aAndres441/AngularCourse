import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appDirectivBetter]'
})

export class DirectivBetterDirective implements OnInit {

  @HostBinding('style.backgroundColor') propiedadBackground = 'violet';

  /* arriba dice: accede en elemento en que esta usandose, a su propiad estilo (style..),
  sera llamado en el @hostListener */

  /* abajo: es lo mismo pero utilizo porp con @input para sobreescribirlo desde afuera,
   y lo llamo desde @HostListener, donde le cambio ese color*/

  @Input() colorDefault = 'orange';
  @Input() colorSecond = 'yellow';

  @HostBinding('style.backgroundColor') propBackground: string;



  constructor(private renders: Renderer2, private elRef: ElementRef) {
  }

  ngOnInit() {
    this.propBackground = this.colorDefault;
/*     this.renders.setStyle(this.elRef.nativeElement, 'backgroundColor', 'yellow', false, false);
 */  }

  /*@HostListener es evento emitido por el DOM y se ejecutara simpre que le paso una cadena como argumento,
  Tambien puede recibir eventos o argumentos como click en los parametros, como
  mouseOver(eventData: Event) */

  @HostListener('mouseenter') mouseover(data: Event) {
    this.renders.setStyle(this.elRef.nativeElement, 'backgroundColor', 'yellow');
  }

   /* @HOSTLISTENER */
  @HostListener('mouseleave') mouseleave(data: Event) {
    this.renders.setStyle(this.elRef.nativeElement, 'backgroundColor', 'pink');
  }

  /* @HOSTBINDING */
  /* Aca usamos @HostBonding para cambiar DOM, no el renderes */
  @HostListener('mouseleave') mouseleave2(data: Event) {
    /* this.renders.setStyle(this.elRef.nativeElement, 'backgroundColor', 'pink'); */
     /* aca le pasamos el hostBinding */
     this.propiedadBackground = 'black';
  }
  @HostListener('focus') onfocus() {
    this.propBackground = this.colorDefault;
  }
  @HostListener('blur') onblur() {
    this.propBackground = this.colorSecond;
  }

}
