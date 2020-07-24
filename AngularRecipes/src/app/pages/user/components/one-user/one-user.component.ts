import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.css']
})
export class OneUserComponent implements OnInit, OnDestroy {

  user: User;
  usu: { id: number, name: string };
  paramsSubscriptionForDestroy: Subscription;
  name: string;
  id: number;
  pruebaNumeroId: number;
  listaStatus: User[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: UserService) { }

  ngOnInit() {
    // obtengo datos parametros de url
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.fragment);
    this.route.fragment.subscribe();
    this.route.queryParams.subscribe();

    /* this.usu = {
      id: this.route.snapshot.params.id,
      name: this.route.snapshot.params.name */
    /*
    lastname: 'Arias',
    status: 'active',s
    timeStamp: new Date() */
    /* }; */


    this.route.params.subscribe(
      (parm: Params) => {
        this.id = +parm.id;
        this.name = this.route.snapshot.fragment;
      }
    );

    this.user = this.service.getOneUser(this.id);

    alert('NUMERO ID: - ' + this.id + 'El ususario: ' + this.user.toString());

    /* al querer llegar a otra ruta desde el mismo componente debemos avisar,
     usando otros parametros que tiene incluido router que son observables, se ejecutan cada vez que  cambia el parametro y asincronos
     y que debemos suscribir a la route para que actualize el objeto usuario y usarlo si trae datos en el futuro.
     Resumen: esto cambiara el objeto  usu SOLAMENTE y cada vez que cambie el parametro de ruta, y este se actualizara al suscribir
      en la devolucion de la llamada anonima.
      Ver susbscribe, que solo se usa cuando estamos en el componente y no se carga desde otro sino desde el mismo cuando hay cambios*/

    this.paramsSubscriptionForDestroy = this.route.params
      .subscribe(
        (params: Params) => {
          this.usu.id = +params.id;
        }
      );
  }

  ngOnChange() {
    this.user = this.service.getOneUser(this.id);
  }

  // cancelo la susbscripcion, pero en este caso no es necesario pues angular lo hace solo, cancela los observables de el.
  ngOnDestroy() {
    this.paramsSubscriptionForDestroy.unsubscribe();
  }
  
  
  /* aca cargo la url con datos mediante programacion */
  cargaUserConParams(id: number) {
    this.router.navigate(['/users', id],
      {
        queryParams: { numerEdit: '22' },
        fragment: 'pauloAlondras'
      });
  }

  cargaUserSinParams() {
    this.router.navigate(['../'],
      {
        relativeTo: this.route
      });

    /*  { relativeTo: this.route,
      queryParams: { numerEdit: 'sin Id' },
      fragment: 'fragmento'
    });  */

  }

  getUsersStatus(valor: string): User[] {
    this.listaStatus = this.service.getUsersStatus(valor);
    alert(this.listaStatus.length + 'LISTA de ' + valor);
    return this.listaStatus;
  }

}
/* this.id = id;

        this.name = name;
        this.lastname = lastname;
        this.status = status;
        this.timeStamp = new Date(); */