import { IsNotEmpty } from "class-validator"

export class loginUserDto {
    
    @IsNotEmpty()
    readonly userName: string
    
    @IsNotEmpty()
    readonly password: string
}