import { IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { TransactionType } from "../entities/Transaction";

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @IsNumber()
    value!: number;

    @IsNotEmpty()
    @IsISO8601()
    date!: string;

    @IsNotEmpty()
    @IsEnum(TransactionType)
    type!: TransactionType;

    @IsNotEmpty()
    @IsUUID()
    bankAccountId!: string;

    @IsOptional()
    @IsUUID()
    categoryId?: string;
}
