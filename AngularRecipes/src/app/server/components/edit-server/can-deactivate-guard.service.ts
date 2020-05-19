
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';


// este sera el metodo de esta interface

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// este sera el metodo de este servicio
/* este conenctara un componente con el guard, sera llamado por el enrutador, 
cuando quieramos dejar la ruta, asi que tendra al componente que esta ahora,
del tipo CanComponentDeactivate a usar. */

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(componente: CanComponentDeactivate,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        /* nextState?: es un argumento opcional*/

        /* aca llama al metodo del componente que estamos actualmente, y que a su vez implementa la interface */

        return componente.canDeactivate();
    }

    /*
        AL USAR ESTE SERVICIO el ENRUTADOR en el componente que lo llama y que usa la interface, confiamos que
        que existe una CONECCION ENTRE GUARD Y COMPONENTE y  puede ejecutar metodo canDeactivate() para chequear
        si podemos salir de la ruta
     */
}
