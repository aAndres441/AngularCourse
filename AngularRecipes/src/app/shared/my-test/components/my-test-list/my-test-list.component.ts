import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation, SimpleChanges, ContentChild, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-test-list',
  templateUrl: './my-test-list.component.html',
  styleUrls: ['./my-test-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyTestListComponent implements OnInit {

  @Output ('alias_LaTuna') crearTuna = new EventEmitter<{name: string, desc: string}>();
  @Output() crearCrasa = new EventEmitter<{name: string, desc: string}>();
  @Output() deleteListaPlantas = new EventEmitter<{pos: number}>();

  /* @Input() lasComidasDelPadre: {type: string, name: string, content: string}; */
  @Input() lasComidasDelPadre = new Array<any>();

  @ContentChild('idParaContentChild', { static: true }) myIdContentChild: ElementRef;

  @ViewChild('panel', { static: true}) panel: ElementRef;

  newName = '';
  newDescription = '';
  newPos: number;

  /*  @Output() incrementCounter = new EventEmitter(); */

  constructor() {
  }

  ngOnInit() {
    /* alert('ContentChild Dice -' + this.myIdContentChild.nativeElement.textContent); */
    /* alert('panel Dice -' + this.panel.nativeElement.textContent); */
  }

  ngAfterViewInit(){
    /* alert('panel Dice  de ngAfterViewInit -' + this.panel.nativeElement.textContent); */
  }
  ngAfterContentInit(){
    /* alert('ngAfterContentInit'); */
    console.log('onAfterViewInit');
    console.log('after content ' + this.myIdContentChild.nativeElement.textContent);
  }

  onAddTunas(address: HTMLInputElement) {
    this.crearTuna.emit({
      /* Abajo le asigno el valor de input no usando el doubleDataBinding */
      name: address.value,
      desc: this.newDescription     
    });   
  }

  onAddCrasas() {
    this.crearCrasa.emit({
      name: this.newName,
      desc: this.newDescription
    });
  }

  delete() {
    alert(+'...'+ this.newPos)
    this.deleteListaPlantas.emit(
      {pos: this.newPos
      });
      
   /*  this.newName = '';
    this.newDescription = '';
    this.newPos = -1; */

  }

  


}
