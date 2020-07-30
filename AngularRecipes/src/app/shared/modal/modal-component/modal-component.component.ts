import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit {

  title = 'Example Angular 8 Material Dialog';

  constructor(private matDialog: MatDialog,
              public dialogRef: MatDialogRef<ModalComponentComponent> ) { }

  ngOnInit(): void {
  }

 /*  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogBodyComponent, dialogConfig);
  } */

  close() {
    this.dialogRef.close('Thanks for using me!');
  }

  

 /*  close() {
    this.matDialog.afterAllClosed()
    .subscribe(value => {
      console.log(`Dialog sent: ${vaue}`); 
    ); */

}
