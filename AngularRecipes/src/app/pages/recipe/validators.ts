import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class ValidatorsRecipes {

    static nameForbidden(control: FormControl): { [sdt: string]: boolean } {
        if (control.value === 'Andres') {
            return ({ nombreProhibido: true });
        }
        return null;
    }

    static asyncMailForbidden(control: FormControl): Promise<any> | Observable<any> {
        const res = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'test@TestBed.com') {
                    resolve({ mailIForbidden: true });
                } else {
                    resolve(null);
                }
            }, 2000);
        });
        return res;
    }

}