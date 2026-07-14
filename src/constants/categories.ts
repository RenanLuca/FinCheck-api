import { Category, TransactionType } from '../../generated/prisma/client';

export const categories: Omit<Category, 'id' | 'userId'>[] = [
    { name: "Salário", icon: "salary", type: TransactionType.INCOME },
    { name: "Freelance", icon: "freelance", type: TransactionType.INCOME },
    { name: "Investimentos", icon: "investments", type: TransactionType.INCOME },
    { name: "Alimentação", icon: "food", type: TransactionType.EXPENSE },
    { name: "Transporte", icon: "transport", type: TransactionType.EXPENSE },
    { name: "Saúde", icon: "health", type: TransactionType.EXPENSE },
    { name: "Educação", icon: "education", type: TransactionType.EXPENSE },
    { name: "Lazer", icon: "leisure", type: TransactionType.EXPENSE },
    { name: "Moradia", icon: "housing", type: TransactionType.EXPENSE },
    { name: "Contas e Serviços", icon: "bills", type: TransactionType.EXPENSE },
    { name: "Compras", icon: "shopping", type: TransactionType.EXPENSE },
    { name: "Viagem", icon: "travel", type: TransactionType.EXPENSE },
    { name: "Outros", icon: "others", type: TransactionType.EXPENSE },
]