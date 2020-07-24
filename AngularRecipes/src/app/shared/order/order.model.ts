export interface Order {
    
 numberOrder: number;
 items: [{
    name: string;
    customer: string;
    details: string;
    date: Date;
 }];

}
