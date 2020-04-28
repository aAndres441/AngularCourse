import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, NgForm, FormControlName } from '@angular/forms';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ValidatorsRecipes } from '../../validators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit { // , OnDestroy

  id: number;
  editMode = false;
  /* myObsInterval: Subscription;*/
  recipeName: string;
  recipe1: Recipe;
  formNewRecipe: FormGroup;

  /* new recipe form reactive */
  fgNew: FormGroup;
  forbbidenUsernames = ['Guiso', 'Asado'];
  imgDefault = 'src\assets\Imagenes\flor Pajarito.jpg';

  @ViewChild('formEdit', { static: false }) f: NgForm;
 /* esto puedo borrrars solo entrevera  
  @ViewChild('descriptionEdit', { static: false }) descriptionEdit: ElementRef;
  @ViewChild('descripEdit', { static: false }) descripEdit: ElementRef;
  @ViewChild('idEdit2', { static: false }) idEdit: ElementRef; */
  submitEditOk = false;
  nameEditDEfault: string;
   @ViewChild('nameEdit2', { static: false }) nameValorIngresado: ElementRef;
  // tslint:disable-next-line: max-line-length
  descriptionEditDefault: string; // = 'Juan , <span class=class=help class=help-blo cngIf !nameEdi t.valid && nameEdit.touched- blocngIf !nameEdit.valid && nameEdit.touchedhel p-blocngIf !nameEdit.valid && nameEdit.touched ';
  idEditDefault: number; /*2500 +this.id */

  recipe2 = {
    id:   44,
    name: '',
    description: '',
    image: null,
    ingreds : ['Arrox', 'Palito'],
    rating : 4
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private servicio: RecipeService) { }

  ngOnInit() {
    /* invento interval
    this.myObsInterval = interval(1000).subscribe(count => {
      alert(count + ' yes');
   } ); */
   

    // recupero id del parametro
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param.id;
        /* alert('PARAMS= ' + param.id + 'frag ' + param.name);
        
        this.recipeName =  param.fragment; */
        // this.idEditDefault = +param.id;

        this.editMode = param.id != null;
        
        /* this.router.navigate(['recipes', this.id , 'edit'], {
          queryParams: { ID: this.id },
          fragment: 'editing'
        }); */
        // editMode es true si al comparar param.id con null  me devuelve algo. 
        /* this.status = 'Ocupado' ? 'Libre' : 'Ocupado'; */
        // console.log(this.editMode);


       /*  if (this.editMode = param.id != null) {
          this.router.navigate(['recipes', this.id], {
            queryParams: { ID: this.id },
            fragment: 'editing'
          });
        } else {
          this.router.navigate(['recipes/new'], {
            queryParams: { ID: -1 },
            fragment: 'new'
          });
        } */

        this.recipe1 = this.servicio.getOneRecipe(this.id);

        this.nameEditDEfault = this.recipe1.name;
        this.idEditDefault = this.recipe1.id;
        this.descriptionEditDefault = this.recipe1.description;

       /*  this.f.form.patchValue({
          nameEdit: this.recipe1.name,
          idEdit: this.id,
          descripEdit: this.recipe1.description
        }); */
      }
    );

      /* New recipe, reactive */
    this.formNewRecipe = new FormGroup({
        name: new FormControl('Rabos', Validators.required),
        description: new FormControl(null, [Validators.required, 
                          this.notValidtDescrip.bind(this),
                          Validators.maxLength(10)]),
        ingredients: new FormControl(null, Validators.required),
        rating: new FormControl(4, Validators.required),
        imagen: new FormControl(null)
      });

   /*  this.formNewRecipe.statusChanges.subscribe(
        (valor) => alert (valor)
      ); */

      /********************New recipe form reactive********************** */
      /* username: new FormControl('Andres', [Validators.required , 
                                              Validators.minLength(10), 
                                              this.forbbidenNames.bind(this)]), */
    this.fgNew = new FormGroup({
      nombre: new FormControl('ale', [Validators.required, 
                                Validators.maxLength(14),
                              this.forbbidenNames.bind(this),
                            ValidatorsRecipes.nameForbidden]),
      descripcion: new FormControl(null, [Validators.required]),
      imagePath: new FormControl('src\assets\Imagenes\flor Pajarito.jpg', Validators.required),
      image: new FormControl(null),
      ingres: new FormControl(null)
      });
      /* nombre: new FormControl('ale',[Validators.required,
                            Validators.minLength(4),
                          this.forbbidenNames.bind(this),
                          ValidatorsRecipes.nameForbidden]), */
   
     /* solo para mostrar */
    /* this.fgNew.statusChanges.subscribe(
      (value) => alert(value)
    ); */

   /* ***************  termina OnInit() ****************/
  }

  /* ngOnDestroy(): void {
    this.myObsInterval.unsubscribe();
  } */

  notValidtDescrip(contyrol: FormControl): {[s: string]: boolean} {
    if(contyrol.value === 'Test') {
      return {noPermite : true};
    }
    return null;
  }

  onEditForm() {
    console.log(this.f);
    alert('Formulario es: ' + this.f.valid);

    this.submitEditOk = true; // solo para cambiar valor de envio
                // cargo los nombres (valor name del control) de los controles para guardar.

   /*  this.nameEditDEfault = this.f.value.nameEdit;
    this.recipe2.name = this.f.value.nameEdit;
 */
    alert('First name initial ' + this.recipe2.name.charAt(0) + '---');

   
    ///this.f.reset();
  }
  
  addValuea() {
    // alert(1 + this.f.status);
    // alert(4 + this.f.value.nameEdit);
  
    const suggestedName = 'Superuser';
    alert('pasa al edit');
    this.f.form.patchValue({
      idEdit: 2020,
      nameEdit: 'this.recipeName', //  'feni@gMa.com',
      descripEdit: this.nameValorIngresado.nativeElement.value()
    });

   /*  this.f.setValue({
      nameEdit: 'Andres',
      idEdit: '34',
      descripEdit: 'Hello?',
    }); */
  }

  /* ERRORES */
  checkValidity(fieldName: string): boolean {
    return this.getErrorCodes(fieldName) !== null && this.fgNew.get(fieldName).touched;
  }

  getErrorCodes(fieldName: string) {
    return this.fgNew.get(fieldName).errors !== null ? Object.keys(this.fgNew.get(fieldName).errors) : null;
  }

  forbbidenNames(unControl: FormControl): { [s: string]: boolean } {
    /* clave que pueda interpretarse como una cadena y esto es solo la sintaxis
     de TypeScript, y el retorno debe otro objeto error string para interpretaese boolean*/
    if (this.forbbidenUsernames.indexOf(unControl.value) !== -1) {
      return { nameIsForbiddenObject: true };
    }
    return null;
  }

}
