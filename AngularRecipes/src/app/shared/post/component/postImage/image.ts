import { Observable } from 'rxjs';

export class Image {
    title: string;
    uploading: false;
    uploadPercent: Observable<number>;
    detail: string;
    downloadUrl: Observable<string>;

    constructor(public file: File = file) {
        this.title = file.name;
    }
}
