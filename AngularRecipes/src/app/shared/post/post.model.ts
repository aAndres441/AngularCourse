export class Post {
    id: number;
    title: string;
    content: string;
    image: ImageData;
    imageUrl: any;
    data: Date;

    constructor(title: string, content: string, imagePath: string) {
        this.title = title;
        this.content = content;
        this.imageUrl = imagePath;
        this.data = new Date(Date.now());
    }

    toString() {
        return `Title: ${this.title} ` +  this.content + '-';
    }
}
