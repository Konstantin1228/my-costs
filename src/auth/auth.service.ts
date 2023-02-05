import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import { User } from "src/schemas/users.schema";
import { UsersService } from "src/users/users.service";
import { jwtConstants } from "./contants/constants";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(userName: string): Promise<User | null> {
        const user = await this.usersService.findOne(userName)

        if (!user) return null

        return user
    }

    async generateAccesToken(user: User) {
        return {
            _acces_token: this.jwtService.sign({ user })
        }
    }

    async generateRefreshToken(userId: string) {
        return {
            refresh_token: this.jwtService.sign(
                { userId },
                {
                    secret: jwtConstants.secret,
                    expiresIn: "30d"
                }
            )
        }
    }

    verifyToken(token: string) {
        try {
            return this.jwtService.verify(token)
        } catch (error) {
            return { error: error.message }
        }
    }
    
    parseJwt(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    async getUserByTokenData(token: string): Promise<User> {
        const parsedTokenData = this.parseJwt(token)

        // return await this.usersService.findOne(parsedTokenData.user.username)
        return await this.usersService.findOne(parsedTokenData.user.userName)
    }
}