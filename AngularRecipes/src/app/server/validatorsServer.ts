import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class ValidatorsServer {

    static onlyStatus = ['offline', 'online', 'critica', 'stable'];
     


    static nameForbidden(control: FormControl): { [sdt: string]: boolean } {
        if (control.value === 'Andres') {
            return ({ nombreProhibido: true });
        }
        return null;
    }

    static myMaxLength(control: FormControl): {} {
        if ( control.value.length > 20) {
            return ({maxiLength: true});
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

    static minLength(control: FormControl): { [sdt: string]: boolean } {
        if (control.value.length < 4) {
            return ({ minimoLength: true });
        }
        return null;
    }
     static statusPermited(control: FormControl): { [sdt: string]: boolean } {
        if (this.onlyStatus.indexOf(control.value) >= 0) {
            return { statusObject: true };
          }
        return null;
    }


}