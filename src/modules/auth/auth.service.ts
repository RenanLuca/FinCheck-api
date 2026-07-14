import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { categories } from '../../constants/categories';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UsersRepository, private readonly jwtService: JwtService) { }
    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto;
        const user = await this.userRepository.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.generateAccessToken(user.id);

        return { accessToken };

    }

    async signup(signupDto: SignupDto) {

        const { name, email, password } = signupDto;

        const emailTaken = await this.userRepository.findUnique({
            where: {
                email: email,
            }
        })

        if (emailTaken) {
            throw new ConflictException('Email already taken');
        }

        const hashedPassword = await hash(password, 10);

        const user = await this.userRepository.create({
            data: {
                name,
                email,
                password: hashedPassword,
                categories: {
                    createMany: {
                        data: categories
                    }
                }
            }
        })

        const accessToken = await this.generateAccessToken(user.id);

        return { accessToken };
    }

    private async generateAccessToken(userId: string) {
        const payload = { sub: userId };
        return this.jwtService.signAsync(payload);
    }
}
