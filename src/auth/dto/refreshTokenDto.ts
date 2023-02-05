import { IsNotEmpty } from "class-validator"

export class refreshTokenDto {

    @IsNotEmpty()
    readonly refresh_token: string

    @IsNotEmpty()
    readonly userName: string
}