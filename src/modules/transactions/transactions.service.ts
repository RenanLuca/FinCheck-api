import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from '../../shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service';
import { TransactionType } from './entities/Transaction';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { name, value, date, type, bankAccountId, categoryId } = createTransactionDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return this.transactionsRepository.create({
      data: {
        name,
        value,
        date,
        type,
        bankAccountId,
        categoryId,
        userId,
      },
    });
  }

  findAllByUserId(
    userId: string,
    filters: { month: number; year: number; bankAccountId?: string; type?: TransactionType },
  ) {
    const { month, year, bankAccountId, type } = filters;

    return this.transactionsRepository.findMany({
      where: {
        userId,
        ...(bankAccountId && { bankAccountId }),
        ...(type && { type }),
        date: {
          gte: new Date(Date.UTC(year, month, 1)),
          lt: new Date(Date.UTC(year, month + 1, 1)),
        },
      },
    });
  }

  async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    const { name, value, date, type, bankAccountId, categoryId } = updateTransactionDto;

    await this.validateEntitiesOwnership({ userId, transactionId, bankAccountId, categoryId });

    return this.transactionsRepository.update({
      where: { id: transactionId },
      data: {
        name,
        value,
        date,
        type,
        bankAccountId,
        categoryId,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    return this.transactionsRepository.delete({
      where: { id: transactionId },
    });
  }

  private validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    return Promise.all([
      bankAccountId && this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      categoryId && this.validateCategoryOwnershipService.validate(userId, categoryId),
      transactionId && this.validateTransactionOwnershipService.validate(userId, transactionId),
    ]);
  }
}
