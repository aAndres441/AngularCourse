export class Server {

    // server: { id: number, name: string, status: string };
    id = 0;
    name: string;
    status: string;
    date: Date;
    instanceType: string;

    constructor(id: number, name: string, status: string, date: Date, instanceType: string) {

        this.id = id;
        this.name = name;
        this.status = status;
        this.date = date;
        this.instanceType = instanceType;
    }

    toString(){
        return 'Nombre: ' + this.name + ', ID: ' + this.id +
        'Status: ' + this.status + ', Date: ' + this.date +
        'Instance: ' + this.instanceType;
    }

}
