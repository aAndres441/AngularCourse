import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { ServersService } from '../../servers.service';
import { ValidatorsServer } from '../../validatorsServer';
import { ThrowStmt } from '@angular/compiler';
import { Server } from '../../server-model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-server-component',
  templateUrl: './new-server-component.component.html',
  styleUrls: ['./new-server-component.component.css']
})
export class NewServerComponentComponent implements OnInit {

  formNew: FormGroup;
  title = 'New server';
  editMode = false;
  id = -1;
  nombre: string;
  onlyStatus = ['offline', 'online', 'critical', 'stable', 'finished'];
  instanceTypes = ['medium', 'large', 'small'];
  instanceType: string;
  status: string;
  genders = ['male', 'famale'];
  defaultRadio = 'male';
  submitted = false; // solo para cambiar valor de envio 
  forDefault = '';
  dato2: number;
  dato1 = '';
  dato3 = '';

  constructor(private servicio: ServersService, private router: Router, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.id = 4; // esto es solo para probar peromuso en el form
    this.editMode =  this.id !== -1; // param.id != null; || !== -1
    this.initForm();
  }

  private initForm() {
    this.submitted = false;
    let serverIdBuscada = this.id;
    let serverNameBuscado = '';
    let serverStatusBuscado = '';
    let serverInstanceBuscada = '';
    let serversDateBuscada = null;

    if (this.editMode) {
      this.title = 'My server';
      const serverBuscada = this.servicio.getServer(this.id);
       // alert(serverBuscada.toString());
     // alert('¡SerVER + ' + serverBuscada.name)
      serverIdBuscada = serverBuscada.id;
      serverNameBuscado = serverBuscada.name;
      serverStatusBuscado = serverBuscada.status;
      serverInstanceBuscada = serverBuscada.instanceType;
      serversDateBuscada = serverBuscada.date;
      
      /*  lo de abajo solo para mostrar */
      this.nombre = serverNameBuscado;
      this.status = serverStatusBuscado;
      this.instanceType = serverInstanceBuscada;
      /* ************************* */

      this.formNew = new FormGroup({
        id2: new FormControl(serverIdBuscada, [Validators.required]),
        nombre: new FormControl(serverNameBuscado, [Validators.required,
          ValidatorsServer.myMaxLength,
          ValidatorsServer.minLength]), /* ,
          Validators.pattern(/^[1-9]+[0-9]*$/) */
        status: new FormControl(serverStatusBuscado, Validators.required), // , [Validators.required, ValidatorsServer.statusPermited]
        instanceType: new FormControl(serverInstanceBuscada, [Validators.required]),
    });
      /* ---termina initForm --------------- */

       /* aca solo para mostrar */
      this.formNew.valueChanges.subscribe(
      (valor) => console.log (valor)
    );

    }
  }

  onSubmit() {
    
    this.submitted = true;

    /*puedo sustituir esta newServ por los valores del formulario,
      ademas utilizo bien lo reactivo y no preciso importar Recipe.*/
    const newServ = new Server(
                  this.formNew.value.id2,
                  this.formNew.value.nombre,
                  this.formNew.value.status,
                  new Date(),
                  this.formNew.value.instanceType);
                  
                  // this.formNew.value.gender

    if (this.editMode) {
      this.servicio.updateServer2(this.id, newServ); // this.formNew.value || newReci
    } else {
      this.servicio.addServer(newServ); // this.formNew.value() || newReci
    } 
     // llamo al cancel() al terminar el submit y asi vuelve a tras
    this.onCancel();
  }

  onCancel() {   
   // this.router.navigate(['home'], {relativeTo: this.route});
   alert ('SALE Y VALE CANCEL()');
   //this.formNew.reset();
   this.router.navigate(['/home'], {relativeTo: this.route});
  }
  changeId(event: Event) {
    this.id = Number((event.target as HTMLInputElement).value); 
    // (<HTMLInputElement>event.target).value   
    // (event.target as HTMLInputElement)
    // this.price2 = this.unValor.nativeElement.value; 
  }
  forbbidenNames(unControl: FormControl): { [s: string]: boolean } {
    /* clave que pueda interpretarse como una cadena y esto es solo la sintaxis
     de TypeScript, y el retorno debe otro objeto error string para interpretaese boolean*/
    if (this.onlyStatus.indexOf(unControl.value) !== -1) {
      return { nameIsForbiddenObject: true };
    }
    return null;
  }

}
