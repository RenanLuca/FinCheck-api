import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "../../../../generated/prisma/client";

@Injectable()
export class CategoriesRepository {
    constructor(private readonly prismaService: PrismaService) {}

    findMany(findManyDto: Prisma.CategoryFindManyArgs) {

        return this.prismaService.category.findMany(findManyDto);
    }

    findFirst(findFirstArgs: Prisma.CategoryFindFirstArgs) {
        return this.prismaService.category.findFirst(findFirstArgs);
    }

    create(createArgs: Prisma.CategoryCreateArgs) {
        return this.prismaService.category.create(createArgs);
    }

    update(updateArgs: Prisma.CategoryUpdateArgs) {
        return this.prismaService.category.update(updateArgs);
    }

    delete(deleteArgs: Prisma.CategoryDeleteArgs) {
        return this.prismaService.category.delete(deleteArgs);
    }

}