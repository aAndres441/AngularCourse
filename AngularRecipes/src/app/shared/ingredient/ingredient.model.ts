import { ArgumentOutOfRangeError } from 'rxjs';

export class Ingredient {
    public id: number;
    public name: string;
    public amount: number;

    constructor(name: string, amount: number) {        

        if (amount > 0 && name !== '') {
            this.name = name;
            this.amount = amount;
            this.id = this.lastId();
            
        } else {
            this.error();
        }
    }

    private error(): string {
        return 'Check your data';
    }

    private toString(): string{
        return this.name + ' Quantity ' + this.amount;
    }

    lastId(): number {
        return this.id + 24;
    }
}
