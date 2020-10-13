import { Observable } from 'rxjs';

export class Image {
    title: string;
    uploading = false;
    uploadPercent: Observable<number>;
    downloadUrl: Observable<string>;
    size: Observable<number>;
    size2: number;
    detail: string;
    type: string;

   /*  constructor(public file: File = file) {
        this.title = file.name;
        this.detail = file.size + '';

    } */
    constructor(name: string, size2: number, detail: string, type: string) {
        this.title = name;
        this.size2 = size2;
        this.detail = detail;
        this.type = type;
    }

    setdownloadUrl(newUrl: Observable<string>) {
        this.downloadUrl = newUrl;
    }

}
