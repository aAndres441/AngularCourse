import { Observable } from 'rxjs';

export class Image {
    title: string;
    uploading = false;
    uploadPercent: Observable<number>;
    downloadUrl: Observable<string>;
    detail: string;

    constructor(public file: File = file) {
        this.title = file.name;
    }
}
