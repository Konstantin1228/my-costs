import { Body, Controller, Post, Res, HttpStatus, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { createUserDto } from "./dto/createUser.dto";
import { loginUserDto } from "./dto/loginUserDto";
import { refreshTokenDto } from "./dto/refreshTokenDto";
import { LoginGuard } from "./guards/login.guard";
import { RefreshJWTGuard } from "./guards/refresh-jwt.guard";
import { RegistrationGuard } from "./guards/registration.guard";

@Controller("auth")
export class AuthController {
    constructor(private usersService: UsersService, private authService: AuthService) { }

    @UseGuards(LoginGuard)
    @Post("login")
    async loginUser(@Body() loginUserDto: loginUserDto, @Res() res: Response) {
        const user = await this.usersService.login(loginUserDto)

        const acces = await this.authService.generateAccesToken(user)
        const refresh = await this.authService.generateRefreshToken(user._id as string)

        res.statusCode = HttpStatus.OK
        return res.send({ ...acces, ...refresh, userName: user.userName })
    }

    @UseGuards(RegistrationGuard)
    @Post("registration")
    async registrationUser(@Body() createUserDto: createUserDto, @Res() res: Response) {
        await this.usersService.registration(createUserDto)

        res.statusCode = HttpStatus.CREATED
        return res.send("user created")
    }

    @UseGuards(RefreshJWTGuard)
    @Post("refresh")
    async refreshToken(@Body() refreshTokenDTO: refreshTokenDto, @Res() res: Response) {
        const validToken = this.authService.verifyToken(refreshTokenDTO.refresh_token)

        const user = await this.usersService.findOne(refreshTokenDTO.userName)
        const acces = await this.authService.generateAccesToken(user)

        if (validToken?.error) {
            if (validToken?.error === "jwt expired") {
                const refresh = await this.authService.generateRefreshToken(user._id as string)
                res.statusCode = HttpStatus.OK
                return res.send({ ...acces, ...refresh })
            } else {
                res.statusCode = HttpStatus.BAD_REQUEST
                return res.send({ error: validToken?.error })
            }
        } else {
            res.statusCode = HttpStatus.OK
            return res.send({ ...acces, refresh_token: refreshTokenDTO.refresh_token })
        }
    }
}