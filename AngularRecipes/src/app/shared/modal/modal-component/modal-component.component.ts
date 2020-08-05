import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit {

  titleModal = ' Angular 8 Material Dialog';
  form: FormGroup;

  constructor(private matDialog: MatDialog,
              public dialogRef: MatDialogRef<ModalComponentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.initForm();
  }
  initForm() {
    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      image: new FormControl(null)
    });

    /*  this.title = title;
        this.content = content;
        this.image = null;
        this.imageUrl = imagePath;
        this.data = new Date(Date.now());*/
 
    this.form.statusChanges
    .subscribe((res) => console.log(`Estatus de form dialogo ${res}`)
    );
 
 
      }

 /*  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogBodyComponent, dialogConfig);
  } */

  close() {
    this.dialogRef.close('Thanks for close me!');
  }

  save() {
    console.log('El FORM Modal ES: ' + this.form.valid);
    alert('El FORM Modal ES: ' + this.form.valid);

    if (this.form.valid) {
      /* this.dialogRef.close('Thanks for save me!' +
        this.form.get('title').value +
        this.form.get('content').value); */
        this.dialogRef.close('Thanks for save me!');
    } else {
      this.dialogRef.close('It is bad! ');
    }
  }

  

 /*  close() {
    this.matDialog.afterAllClosed()
    .subscribe(value => {
      console.log(`Dialog sent: ${vaue}`); 
    ); */

    changeName(event: Event) {   // solo para mostrar el input del htmml
      this.titleModal = (event.target as HTMLInputElement).value;
    }

}
