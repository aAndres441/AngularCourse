import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm, NgModel, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  */
/* lo de abajo es usado para form de plantilla */
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

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  */
   /* lo de abajo es solo para ejetrcicio */
   @ViewChild('formEx', { static: false }) myFormExample: NgForm;
   isOkform = false;
   theMail = '';
   thePass = '';
   theSubscr = '';
   user2 = { email: '', subscription: '', password: '' };
   subscriptions = ['Basic', 'Advanced', 'Pro'];
   defaultSelect = 'Advanced';
   theCity = '';
   /*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  */

    /* lo de abajo es usado para form reactivo */
    signupForm: FormGroup;
    /*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  */
    /* lo de abajo es usado para Form Array */
    listHobbies = new FormArray([new FormControl('Pelota'),new FormControl('Pelota')], Validators.required);
    listHobbies2 = new FormArray([new FormControl('Pelota')]);

  /*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  */

  constructor() { }

  ngOnInit() {
    this.submitted = false; // solo para cambiar valor de envio

    /* Aca es todo para form reactivo y con form anidado */
    this.signupForm = new FormGroup({
      formAnidado: new FormGroup({
         username: new FormControl('Andres', [Validators.required , Validators.minLength(10)]),
         email: new FormControl(null, [Validators.required, Validators.email]),
      }),

      address: new FormControl(null, Validators.required),
      gender2: new FormControl('famale'),
    });
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

  onSubmitReactiv() {
     alert (this.signupForm.controls.address.value);
     alert (this.signupForm.controls.gender2.value);
    
     alert (this.signupForm.value.formAnidado.email);
/* formAnidado */
     this.signupForm.reset();
  }

  getControls() {
    
    return (this.signupForm.get('listHobbies') as FormArray).controls;
    
  }
  get controls() {
    return (this.signupForm.get('listHobbies') as FormArray).controls;
  }

  onAddHobbie() {
    const control = new FormControl(null, Validators.required);

    alert ('SON ' + control.setValue.name + this.listHobbies.length);

    // (this.signupForm.get('listHobbies') as FormArray).push(control); // Agrega el control a la matriz de controles listHobbies
    (this.getControls()).push(control); // Agrega el control a la matriz de controles listHobbies

    // formato viejo (<FormArray> this.signupForm.get('listHobbies')).push(control);
  }
}
