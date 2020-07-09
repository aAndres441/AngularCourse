import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm, NgModel, FormGroup, FormControl, Validators, FormArray, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { promise } from 'protractor';
import { resolve } from 'url';
import { ValdatorsCustomizados } from './validatorsMy';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  */
/* lo de abajo es usado para form de plantilla */
   @ViewChild('myForm') formReferido: NgForm;
   @ViewChild('username') refieroName: ElementRef;
   forDefaultQuestions = ' pet'; /* para enlace unidereccional, y carga select por defecto */
   defaultRadio = 'male';
   answer = '';
   mail = '';
   genders = ['male', 'famale'];
   submitted = false; // solo para cambiar valor de envio   
   suggestedName = '' ;
   emmmail = '' ;
   myPass = '' ;
   theCitys: [''] ;

   user = {
     myUsernombre: '',
     myMail: '',
     mySecretQuestion: '',
     myAnswer: '',
     myGender: ''
   };

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  */
   /* lo de abajo es solo para ejetrcicio template*/
   @ViewChild('formEx') myFormExample: NgForm;
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
    listHobbies = new FormArray([new FormControl('Pelota'), new FormControl('Pelota')], Validators.required);
    listHobbies2 = new FormArray([new FormControl('Pelota')]);

    forbbidenUsernames = ['AnnaCarolina', 'JuanSinMiedo'];
    
  /*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *  */
/* lo de abajo es para ejercicio reactivo */
listExampleStatus = ['Stable', 'Critical', 'Finished'];
formExampleReactivo: FormGroup;
errors: {[s: string]: string} = {
  'required - name': 'Project name shouldn\'t be empty',
  'forbidden - name': 'Invalid project name',
  'required - email': 'Email shouldn\'t be empty',
  'email - email': 'Invalid email value',
};
  constructor() { }

  ngOnInit() {
    
    this.submitted = false; // solo para cambiar valor de envio
    /* Aca es todo para form reactivo y con form anidado */
    this.signupForm = new FormGroup({
      formAnidado: new FormGroup({
         username: new FormControl('Andres', [Validators.required , 
                                              Validators.minLength(10), 
                                              this.forbbidenNames.bind(this)]),
          // vincular esto, el viejo truco de Javascript para asegurarme de que esto se refiera a lo que queremos que haga referencia.
         email: new FormControl(null, [Validators.required, 
                                        Validators.email],
                                        this.forbiddenAsincEmail.bind(this))
      }),

      address: new FormControl(null, Validators.required),
      gender2: new FormControl('famale'),
      hobbies: new FormArray([])
    });

    /* valueChanges */
    this.signupForm.valueChanges.subscribe(
      (value) => console.log (value)
    );
       
    /* statusChanges */
    this.signupForm.statusChanges. subscribe(
      (status) => console.log (status)
    );

    /* Set controles del formulario */
    this.signupForm.setValue({
      formAnidado: {
        username: 'Maximialain',
        email: 'max@Gami.com',
      },
      address: 'capurro 213',
      gender2: 'male',
      hobbies: ['Ala', 'Macaco']
    });

    // para actualizar parte del form
    /* this.signupForm.patchValue({
      formAnidado: {
        username: 'Juianimialain'
      }
     }); */

     /* *******ACA para ej reactivo *************/
    this.formExampleReactivo = new FormGroup(
       {
        exName: new FormControl (null, [Validators.required, 
                                  this.notAllowName.bind(this),
                                  ValdatorsCustomizados.invalidadoresEjercicios],
                                  ValdatorsCustomizados.asyncBValidatorsMy), // solo pasa referencias
        exMail: new FormControl (null, [Validators.required,
                                  Validators.email,
                                  this.notAllowMil.bind(this)]),
        status: new FormControl ('finished'),
        sts: new FormControl('critical')
       }
     );

     /* solo para mostrar */
    this.formExampleReactivo.valueChanges.subscribe(
      (valor) => console.log (valor)
    );
    
    /* ACA TERMINA   ngOnInit() { */
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    alert(suggestedName);
    
     // un enfoque para cargar datos, este sobreescribe todos los controles
   /* this.formReferido.setValue({
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
   /*  alert(this.formReferido.value.userData.email);
       alert('this.formReferido.value.email'); */

  }

 /*  onSubmit(form: NgForm ) {
    confirm('DATOS ' + form.value);
    console.log (form);
  } */

  // sera para ver como envio datos con @ViewChild
  onSubmit() {
    console.log(this.formReferido);
/* esto es para form template */
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
     alert ("address "  + this.signupForm.controls.address.value);
     alert ("gender2 "  +this.signupForm.controls.gender2.value);
    
     alert ("email "  +this.signupForm.value.formAnidado.email);
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
  /* para controlar la entradad de ciertos nombres como validos */
  forbbidenNames(unControl: FormControl): {[s: string]: boolean} { 
    /* clave que pueda interpretarse como una cadena y esto es solo la sintaxis
     de TypeScript, y el retorno debe otro objeto error string para interpretaese boolean*/
    
     if (this.forbbidenUsernames.indexOf(unControl.value) !== -1) {
       return {nameIsForbiddenObject : true};
    }
     return null;
  }

  forbiddenAsincEmail(unControl: FormControl): Promise<any> | Observable<any> {
    const promiseresultado = new Promise<any>(( resolve, reject) => {
      setTimeout(() => {
        if (unControl.value === 'test@TestBed.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null); // cuando es valido el mail
        }
      },
        1500);
    });
    return promiseresultado;
    /* La promesa será que recibe una función con resolución y rechazo como argumentos que podemos
     ejecutar en esa función y establecer un tiempo de esper */
  }

  /* ***************************************** */
  /* Todo para ejemplo reactivo */
  onFormExapleReactivo() {
    console.log(this.formExampleReactivo.value);
    alert(this.formExampleReactivo.controls.exName.value);
    alert(this.formExampleReactivo.controls.exMail.value);
    alert(this.formExampleReactivo.controls.status.value);

    this.formExampleReactivo.reset();
    alert('FENIX');
  }

  notAllowName(control: FormControl ): {[s: string]: boolean} {
    if (control.value === 'Test') {
      return {noPermite : true};
    }
    return null;
  }

  notAllowMil(ocntrol: FormControl): Promise<any> | Observable<any> {
    const result = new Promise<any> (( resolve, reject) =>
    {setTimeout(() => {
      if (ocntrol.value === 'test@Test.com') {
        resolve({noVaEmail: true});
      } else {
        resolve(null);
      }
    }, 1500);
    });
    return result;
  }


  /* ERRORES */
  checkValidity(fieldName: string): boolean {
    return this.getErrorCodes(fieldName) !== null && this.formExampleReactivo.get(fieldName).touched;
  }

  getErrorCodes(fieldName: string) {
    return this.formExampleReactivo.get(fieldName).errors !== null ? Object.keys(this.formExampleReactivo.get(fieldName).errors) : null;
  }


}
