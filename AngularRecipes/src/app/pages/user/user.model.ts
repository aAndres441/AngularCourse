import { Directive } from '@angular/core';
@Directive()
export class User {
    id = 0;
    public name: string;
    public lastname: string;
    public status: string;
    public timeStamp: Date;
    public price: number;

    constructor(id: number, name: string, lastname: string, status: string, price: number) {

        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.status = status;
        this.timeStamp = new Date();
        this.price = price;
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit() {
    }


    setUser(name: string, lastname: string, status: string, price: number): void {
        this.id = this.id++;
        this.name = name;
        this.lastname = lastname;
        this.status = status;
        this.timeStamp = new Date();
        this.price = price;
    }

    toString(): string {
        return '(ID:' + this.id + ')' + 'Nombre: ' + this.name + ' Apellido: ' + this.lastname + ' - Status: ' + this.status + '.';
    }
    setStatus() {
        if (this.status === 'active') {
            this.status = 'inactive';
        } else {
            this.status = 'active';
        }
    }



}
