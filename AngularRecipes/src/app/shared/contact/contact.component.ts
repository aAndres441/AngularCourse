import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

   @ViewChild('myForm', { static: false }) formReferido: NgForm;
   @ViewChild('username', { static: false }) refieroName: ElementRef;
   @ViewChild('elemail', { static: false }) elemail: ElementRef;
   forDefaultQuestions = ' pet'; /* para enlace unidereccional, y carga select por defecto */
   defaultRadio = 'male';
   answer = '';
   mail = '';
   genders = ['male', 'famale'];
   submitted = false; // solo para cambiar valor de envio 
  
   user = {
     myUsernombre: '',
     myMail: '',
     mySecretQuestion: '',
     myAnswer: '',
     myGender: ''
   };

   /* lo de abajo es solo para example */
   @ViewChild('formEx', { static: false }) myFormExample: NgForm;
   isOkform = false;
   theMail = '';
   thePass = '';
   theSubscr = '';
   user2 = { email: "", subscription: "", password: "" };
   subscriptions = ['Basic', 'Advanced', 'Pro'];
   defaultSelect = 'Advanced';
   theCity = '';

  constructor() { }

  ngOnInit() {
    this.submitted = false; // solo para cambiar valor de envio
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    alert(suggestedName);
   /*  // un enfoque para cargar datos, este sobreescribe todos los controles
    this.formReferido.setValue({
      userData:{
        username: suggestedName,
        email: 'ana@gMail.com'
      },
      secret: 'pet',
      question: 'Hello?',
      gender: 'famale'
    }); */

    // un mejor enfoque para cargar datos pues este sobreescribe el control que quiera

    this.formReferido.form.patchValue({
      userData: {
            username: suggestedName,
            email: 'feni@gMa.com'
      }
    });
  }

 /*  onSubmit(form: NgForm ) {
    confirm('DATOS ' + form.value);
    console.log (form);
  } */

  // sera parta ver como envio datos con @ViewChild
  onSubmit() {
    console.log(this.formReferido);

    this.submitted = true; // solo para cambiar valor de envio
    // cargo los nombres (valor name del control) de los controles para darselos a user.
    this.user.myUsernombre = this.formReferido.value.userData.username;
    this.user.myMail = this.formReferido.value.userData.email;
    this.user.mySecretQuestion = this.formReferido.value.secret;
    this.user.myAnswer = this.formReferido.value.question;
    this.user.myGender = this.formReferido.value.gender;
    
    this.formReferido.reset(); // resetea todo el form; hasta el valid y touched
   
  }

  onSubmitExample() {
    this.isOkform = true;
    this.theMail = this.myFormExample.value.exData.emmmail;
    this.theSubscr = this.myFormExample.value.exData.subscription;
    this.thePass = this.myFormExample.value.exData.password;
    this.theCity = this.myFormExample.value.exData.city;

    this.myFormExample.reset();
  }

  
}
