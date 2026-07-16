export enum TransactionType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
}

export interface Category {
    name: string;
    icon: string;
    type: TransactionType;
}
