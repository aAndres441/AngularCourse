import { Directive, HostListener, HostBinding, OnInit } from '@angular/core';

/* @Directive({
    selector: '[appUser]'
}) */

export class User {

    /* ///  DIRECTIVA //// este sera llamado en el @HostListener y aca le cambio a otro color diferenete al inicial. */
    @HostBinding('style.backgroundColor') myBbackground = 'violet';

    numberOfClicks = 0;

    public id = 0;
    public name: string;
    public lastname: string;
    public status: string;
    public timeStamp: Date;
    public price: number;
    public role: string; // faltaria agregarlo en constructor, para validar su rol

    constructor(id: number, name: string, lastname: string, status: string, price: number) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.status = status;
        this.timeStamp = new Date();
        this.price = price;
    }

    /* ///  DIRECTIVA ////   escuchamos el evento, obtenemos los datos y los usamos */
    @HostListener('click', ['$event.target']) onClick(btn) {
        this.myBbackground = 'black'; // llama al @HostBinding
        alert('Boton' + btn + 'Numbers- ' + this.numberOfClicks );
    }

   /*  @HostListener('mouseenter') mouseover(data: Event) {
        this.renders.setStyle(this.elRef.nativeElement, 'backgroundColor', 'yellow');
      } */

    @HostListener('window:key', ['$event'])
     handlekey(eve: KeyboardEvent) {
        this.numberOfClicks++;
      }

      resetCount() {
          this.numberOfClicks = 0;
      }

    setUser(name: string, lastname: string, status: string, price: number): void {
        this.id = this.id++;
        this.name = name;
        this.lastname = lastname;
        this.status = status;
        this.timeStamp = new Date();
        this.price = price;
    }

    toString(): string {
        return `(ID:${this.id})Nombre: ${this.name} Apellido: ${this.lastname} - Status: ${this.status}.`;
    }
    setStatus() {
        if (this.status === 'active') {
            this.status = 'inactive';
        } else {
            this.status = 'active';
        }
    }



}
