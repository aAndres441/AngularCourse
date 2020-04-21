import { FormControlName, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

export class ValdatorsCustomizados {

static invalidadoresEjercicios(control: FormControl): {[st: string]: boolean} {
    if (control.value === 'Test1') {
        return ({invalidName: true}) ;
    }
    return null;
}

static asyncBValidatorsMy(control: FormControl): Promise<any> | Observable<any>{
    const res = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (control.value === 'Test2') {
                resolve ({otroInvalidName: true});
            } else {
                resolve  (null);
            }
        }, 2000);
    });
    return res;
}

}
