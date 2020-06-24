export class Account {
    public name: string;
    public status: string;
    public id: number;

    constructor(id: number, name: string, status: string) {
        this.id = id;
        this.name = name;
        this.status = status;
    }

}
