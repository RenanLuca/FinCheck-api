import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from '../../../shared/database/repositories/transactions.repositories';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionsRepository: TransactionsRepository) {}

  async validate(userId: string, transactionId: string) {
    const transaction = await this.transactionsRepository.findFirst({
      where: { id: transactionId, userId },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }
}
