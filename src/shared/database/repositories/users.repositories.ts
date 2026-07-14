import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "../../../../generated/prisma/client";

@Injectable()
export class UsersRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createUserDto: Prisma.UserCreateArgs) {
 
        return this.prismaService.user.create(createUserDto);
    }

    findUnique(findUniqueUserDto: Prisma.UserFindUniqueArgs) {
        return this.prismaService.user.findUnique(findUniqueUserDto);
    }
}