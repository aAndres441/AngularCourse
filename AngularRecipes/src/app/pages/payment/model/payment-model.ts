export interface Payment {
    id: number;
    description: string;
    count: number;
    totalAmount: number;
    unitPrice: number;
    tmstmp: Date;
}
