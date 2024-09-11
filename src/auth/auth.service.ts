import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

type AuthInput =
    {
        username: string;
        password: string
    };

type SignInData = {
    userId: number,
    username: string
}

type AuthResult = {
    accessToken: string;
    userId: number;
    username: string
}

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private usersServicee: UsersService) {

    }

    async authenticate(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUsers(input);
        if (!user) {
            throw new UnauthorizedException();

        }

        return this.signIn(user)
    }

    async validateUsers(input: AuthInput): Promise<SignInData | null> {

        const user = await this.usersServicee.findUserByName(input.username)

        if (user && user.password === input.password) {
            return {
                userId: user.userId,
                username: user.username
            };
        }
        return null
    }


    async signIn(user: SignInData): Promise<AuthResult> {

        const tokenPayload = {
            sub: user.userId,
            username: user.username
        };

        const accessToken = await this.jwtService.signAsync(tokenPayload)
        return { accessToken: accessToken, username: user.username, userId: user.userId }
    }


}
