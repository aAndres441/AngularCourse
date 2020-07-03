import { Directive } from '@angular/core';
@Directive()
export class User {
    id = 0;
    public name: string;
    lastname: string;
    public status: string;
    public timeStamp: Date;

    constructor(id: number, name: string, lastname: string, status: string) {

        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.status = status;
        this.timeStamp = new Date();
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit() {
    }


    setUser(name: string, lastname: string, status: string): void {
        this.id = this.id++;
        this.name = name;
        this.lastname = lastname;
        this.status = status;
        this.timeStamp = new Date();
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
