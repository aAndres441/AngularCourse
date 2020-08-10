export class Post {
    id: number;
    title: string;
    content: string;
    image: ImageData;
    imageUrl: any;
    data: Date;

    constructor(id: number, title: string, content: string, imag: any) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageUrl = imag;
        this.data = new Date(Date.now());
    }

    toString() {
        return `ID: ${this.id} ` + `Title: ${this.title} ` +   ` Content: ${this.content} ` + ` ImageURL: ${this.imageUrl} `;
    }
}
