export class Post {
    title: string;
    content: string;
    image: ImageData;
    imageUrl: string;
    data: Date;

    constructor(title: string, content: string, imagePath: string) {
        this.title = title;
        this.content = content;
        this.image = null;
        this.imageUrl = imagePath;
        this.data = new Date(Date.now());
    }

    toString() {
        return `Title: ${this.title} ` +  this.content + '-';
    }
}
