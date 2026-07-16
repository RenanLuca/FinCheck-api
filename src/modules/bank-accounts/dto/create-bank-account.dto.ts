import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BankAccountType } from "../entities/BankAccount";

export class CreateBankAccountDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @IsNumber()
    initialBalance!: number;

    @IsNotEmpty()
    @IsEnum(BankAccountType)
    type!: BankAccountType;

    @IsString()
    @IsNotEmpty()
    @IsHexColor()
    color!: string;
}
