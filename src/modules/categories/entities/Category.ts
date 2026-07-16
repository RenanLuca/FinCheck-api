import { TransactionType } from '../../transactions/entities/Transaction';

export interface Category {
    name: string;
    icon: string;
    type: TransactionType;
}
