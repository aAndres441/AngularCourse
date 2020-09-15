import { Directive, HostListener, Component, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../image.model';
import { ImageValidator } from './imageValidator';

@Directive({
  selector: '[appImage]'
})
export class ImageDirective extends ImageValidator {

  @Input()imageList: Image[] = [];  // recibe info del padre
  @Output()mouseArriba: EventEmitter<boolean> = new EventEmitter(); // emite info

  countClicks = 0;

  /* functions DECORADAS por HostListener, cada uno anda solo, no todos juntos */
  @HostListener('click', ['$event.target']) // sera un evento click y su handle del boton
  /*  onClick(btn) {
    // escucha el click del dom, pasa el handle y aumenta
  // alert(btn + 'numero:' + this.countClicks++);
  this.countClicks++,
  console.log('Button', btn, 'Cantidad', this.countClicks);
  } */

  @HostListener('window:keydown', ['$event']) // sera un evento click y su handle del boton.
/*  handleKeyDown(event: KeyboardEvent) {
    this.countClicks--;
    console.log('Baja la cantidad', this.countClicks);
  } */


  /*  Manipulamos los ficheros (entra raton, sale y suelta) */
  @HostListener('dragOver', ['$event']) // sera un evento del mouse
   // entra el raton a los ficheros dragOver
  onDragRatonEntra(event: any) {
    this.preEventAndStop(event);
    this.mouseArriba.emit(true);
  }

  @HostListener('dragLeave', ['$event']) // sera un evento del mouse
  // sale el raton a los ficheros dragLeave
  onDragRatonSalga() {
    this.mouseArriba.emit(false);
    console.log('FREE');
  }

  @HostListener('drop', ['$event']) // sera un evento del mouse, cuando se arrastra
  // suelta el raton a los ficheros drop
  onDrop(event: any) {
    const dataTransf = this.getDataTransfer(event);
    if (!dataTransf) {
      return;
    }
    this.preEventAndStop(event);
    this.extrarerImageness(dataTransf.files);
    this.mouseArriba.emit(false);
  }

/* Termina functions para HostListener */

  // constructor() { }


  /*  metodos para  SUBIR IMAGENES con sus valdators que extends desde una class */

  // obtengo el data transfer
  private getDataTransfer(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    // return dataTransf ? o : de lo contrario el original
  }

  // extrae el contenido de archivos traidos con el imput de la clase padre
  private extrarerImageness(fileeList: FileList): void {
    for (const prop of Object.getOwnPropertyNames(fileeList)) {
      const temp = fileeList[prop];
      if (this.canBeLoaded(temp)) {
        const newImage = new Image(temp);
        this.imageList.push(newImage);
      }
    }
  }

  // valida el archivo a subir
  private canBeLoaded(archivo: File): boolean {
    let res = false;
    if (!this.checkNameRepit(archivo.name, this.imageList) &&
      this.validateType(archivo.type)) { // validateType viene de clase extendida
      res = true;
    }
    return res;
  }

  /* funcion para no abrir el navegador */
  private preEventAndStop(evento: any): void {
    evento.preventDefault();
    evento.stopPropagation();
  }

}
