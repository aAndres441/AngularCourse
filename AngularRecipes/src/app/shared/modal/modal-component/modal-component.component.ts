import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../post/post.model';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit, OnDestroy {

  titleModal = ' Angular 8 Material Dialog';
  form: FormGroup;
  post: Post;
  private editOrNo: boolean;
  /* private postSubscription: Subscription; */

  constructor(private matDialog: MatDialog,
              public dialogRef: MatDialogRef<ModalComponentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) { }


  ngOnInit(): void {
    this.editOrNo = this.data.content; // si recbe un config.data con content
    if (this.editOrNo) {
      alert(`Dialog: ${this.data.content.title} iD ${this.data.content.id}`);
      this.post = this.data.content;
      this.titleModal = this.data.content.title;
    } else { alert('no have content'); }

    /* this.initForm(); */
  }

  close() {
    this.dialogRef.close('Thanks for close me!');
  }

  save() {
    /* console.log('El FORM Modal ES: ' + this.form.valid);
    alert('El FORM Modal ES: ' + this.form.valid); */

    if (/* this.form.valid */ this.editOrNo) {
      /* this.dialogRef.close('Thanks for save me!' +
        this.form.get('title').value +
        this.form.get('content').value); */
      this.dialogRef.close('Thanks for save me!');
    } else {
      this.dialogRef.close('It is bad! ');
    }
  }

  changeName(event: Event) {   // solo para mostrar el input del htmml
    this.titleModal = (event.target as HTMLInputElement).value;
  }

  ngOnDestroy(): void {
    /* this.postSubscription.unsubscribe(); */
  }

  /*   initForm() {
      let id: number;
      let titl = '';
      let conten = '';
      let imag: any;
      if (this.post) {
        id = this.post.id;
        titl = this.post.title;
        conten = this.post.content;
        imag = this.post.image;
      }
      this.form = new FormGroup({
        id: new FormControl(id, Validators.required),
        title: new FormControl(titl, Validators.required),
        content: new FormControl(conten, [Validators.required, Validators.minLength(8)]),
        image: new FormControl(imag)
      });
   */
  /* this.form.patchValue({
    title: this.titleModal,
    content: 'feni@gMa.com'
  }
  ); */

  /* solo para mostrar valor del form*/

  /*  this.form.valueChanges.subscribe(
     (valor) => alert('El valor del del form  active component ' + valor.value)
   ); */

  /*   this.form.statusChanges
      .subscribe((res: Post) => console.log(`Estatus de form dialogo ${res}`)
      );
  } */
}
