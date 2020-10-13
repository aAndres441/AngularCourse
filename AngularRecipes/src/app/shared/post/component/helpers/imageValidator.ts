import { Image } from '../image.model';

export class ImageValidator {

    private acceptType = ['image/jpg', 'image/png'];

    validateType(tipoArchivo: string): boolean {

        /* return tipoArchivo === '' || tipoArchivo === undefined ? false : true;
        si pasa tipo imagen vacio o undefined retorna false sino true por el includes en array acceptType*/

        return tipoArchivo === '' || tipoArchivo === undefined
            ? false
            : this.acceptType.includes(tipoArchivo);
    }

    // comprueba si la imag tiene cargada igual nombre a las que estan en el array
    checkNameRepit(fileName: string, files: File[]): boolean {
        let res = false;
        for (const fil of files) {
            if (fil.name === fileName) {
                res = true;
            }
        }
        return res;
    }

}
