import { Image } from '../image.model';

export class ImageValidator {

    private acceptType = ['image/jpg', 'image.png'];

    validateType(fileType: string): boolean {

        /* return fileType === '' || fileType === undefined ? false : true;
        si pasa tipo imagen que no esta devuelve false sino true por estar incliudo en acceptType*/

        return fileType === '' || fileType === undefined
            ? false
            : this.acceptType.includes(fileType);
    }


    // comprueba si la imag tiene cargada igual nombre a las que estan en el array
    checkDropped(fileName: string, files: Image[]): boolean {
        let res = false;
        for (const fil of files) {
            if (fil.title === fileName) {
                res = true;
            }
        }
        return res;
    }

}
