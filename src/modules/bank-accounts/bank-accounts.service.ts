import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from '../../shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './services/validate-bank-account-ownership.service';
import { TransactionType } from '../transactions/entities/Transaction';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) { }

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {

    const { name, initialBalance, type, color } = createBankAccountDto;

    return this.bankAccountsRepository.create({
      data: {
        name,
        initialBalance,
        type,
        color,
        userId,
      }
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepository.findMany({
      where: {
        userId,
      },
      include: {
        transactions: {
          select: { value: true, type: true },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => ({
      ...bankAccount,
      currentBalance: transactions.reduce(
        (balance, transaction) =>
          transaction.type === TransactionType.INCOME
            ? balance + transaction.value
            : balance - transaction.value,
        bankAccount.initialBalance,
      ),
    }));
  }

  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    const { name, initialBalance, type, color } = updateBankAccountDto;

    return this.bankAccountsRepository.update({
      where: {
        id: bankAccountId,
      },
      data: {
        name,
        initialBalance,
        type,
        color,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    return this.bankAccountsRepository.delete({
      where: {
        id: bankAccountId,
      },
    });
  }
}
