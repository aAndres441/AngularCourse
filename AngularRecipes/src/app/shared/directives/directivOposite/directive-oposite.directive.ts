import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDirectiveOposite]'
})
export class DirectiveOpositeDirective {

  /* cambiara eta property con el set cada vez que cambia afuera con el parametro */
  @Input() set appDirectiveOposite(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef)
      /* crea una vista en el contenedor con la referencia de plantilla que le mando */
    } else {
      this.vcRef.clear();
      /* si condition es falso lo remueve todo de esta platilla */
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

  /* TemplateRef se refiere a la plantilla */
/* TemplateRef se refiere al contenedor donde deberiamos renderizarlo */


}
