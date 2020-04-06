export class Server{

    // server: { id: number, name: string, status: string };
    id = 0;
    name: string;
    status: string;
    
    constructor(id: number, name: string, status: string) {

        this.id = id;
        this.name = name;
        this.status = status;
    }

}
