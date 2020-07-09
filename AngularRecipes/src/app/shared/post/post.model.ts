export class Post {
    title: string;
    content: string;
    data: Date;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
        this.data = new Date(Date.now());
    }

    toString() {
        return `Title: ${this.title} ` +  this.content + '-';
    }
}
