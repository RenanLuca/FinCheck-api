import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "../../../../generated/prisma/client";

@Injectable()
export class TransactionsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createArgs: Prisma.TransactionCreateArgs) {
        return this.prismaService.transaction.create(createArgs);
    }

    findMany(findManyArgs: Prisma.TransactionFindManyArgs) {
        return this.prismaService.transaction.findMany(findManyArgs);
    }

    findFirst(findFirstArgs: Prisma.TransactionFindFirstArgs) {
        return this.prismaService.transaction.findFirst(findFirstArgs);
    }

    update(updateArgs: Prisma.TransactionUpdateArgs) {
        return this.prismaService.transaction.update(updateArgs);
    }

    delete(deleteArgs: Prisma.TransactionDeleteArgs) {
        return this.prismaService.transaction.delete(deleteArgs);
    }
}
