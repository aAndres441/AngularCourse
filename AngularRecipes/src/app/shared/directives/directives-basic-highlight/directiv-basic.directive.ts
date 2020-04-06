import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
        selector: '[appDirectiveBasic]' /* se le agrega [] */
})

// tslint:disable-next-line: directive-class-suffix
export class DirectiveBasicHighLight implements OnInit {

        constructor(private elemento: ElementRef) {
        }

        ngOnInit() {
                this.elemento.nativeElement.style.backgroundColor = 'orange';
        }

}
