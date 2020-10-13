import { Directive, HostListener, Component, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../image.model';
import { ImageValidator } from './imageValidator';

@Directive({
  selector: '[appImage]'
})
export class ImageDirective extends ImageValidator {

  @Input()imageList: Image[] = [];  // recibe info del padre
  @Input()files: File[] = [];  // recibe info del padre, puse las dos para probar typos
  @Output()mouseOver: EventEmitter<boolean> = new EventEmitter(); // emite info

  countClicks = 0;

  /* ATENCION functions DECORADAS por HostListener, cada uno anda solo, no todos juntos */
 
  @HostListener('click', ['$event.target']) // sera un evento click y su handle del boton
   onClick(btn) {
    // escucha el click del dom, pasa el handle y aumenta
  // alert(btn + 'numero:' + this.countClicks++);
  this.countClicks++,
  console.log('Button', btn, 'Clicks amount= ', this.countClicks);
  }

  @HostListener('window:keydown', ['$event']) // sera un evento click y su handle del boton.
 handleKeyDown(event: KeyboardEvent) {
    this.countClicks--;
    console.log('Baja la cantidad', this.countClicks, 'Evento: ', event);
  }


  /* Empieza Manipulamos los ficheros (entra raton, sale y suelta_ dragOver) */
  @HostListener('dragover', ['$event']) // entra raton, sera un evento del mouse
  onDragRatonEntra(event: any) {
   // this.preventAndStop(event);
   this.mouseOver.emit(true);
   console.log('FREE');
  }

  @HostListener('dragleave') // sale el raton, sera un evento del mouse
  onDragRatonSalga() {
    this.mouseOver.emit(false);
    console.log('no');
  }

  @HostListener('drop', ['$event']) //  cuando se arrastra, sera un evento del mouse
  // suelta el raton a los ficheros drop
  onDrop(event: any) {
    const dataTransf = this.getDataTransfer(event);
    if (!dataTransf) {
      return;
    }
    this.preventAndStop(event);
    this.extrarerImageness(dataTransf.files);
    this.mouseOver.emit(false);
  }

/* Termina functions Manipular ficheros con HostListener */

  // constructor() { }


  /*  metodos para  SUBIR IMAGENES con sus validators que extends desde una class */

  // obtengo el data transfer
  private getDataTransfer(event: any) {
    return event.dataTransfer
    ? event.dataTransfer
    : event.originalEvent.dataTransfer;
    // return el mismo dataTransf ? o : de lo contrario el original
  }

  // recuperamos @Input de la clase padre, que extrae el contenido de archivos traidos con el imput button 
  private extrarerImageness(fileeList: FileList): void {
    for (const prop of Object.getOwnPropertyNames(fileeList)) {
      const temp = fileeList[prop];
      if (this.canBeLoaded(temp)) {
        console.log('temp', temp);
        // const newImage = new Image(temp.);
        const newImage = new Image(temp.title, temp.size2, temp.detail, temp.type);
        // le egregue a los 2 array para probar tipos
        this.imageList.push(newImage);
        this.files.push(temp);
      }
    }
  }

  // valida el archivo a subir, usando metodos con extends la clase ImageValidator
  private canBeLoaded(archivo: File): boolean {
    let res = false;
    if (!this.checkNameRepit(archivo.name, this.files) &&
      this.validateType(archivo.type)) { // this.validateType(archivo.file.type)) si fuera type Image
      res = true;
    }
    return res;
  }

  /* funcion para no abrir el navegador */
  private preventAndStop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    // return;
  }

}
