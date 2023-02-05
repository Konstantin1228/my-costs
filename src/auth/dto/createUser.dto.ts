import { IsNotEmpty } from "class-validator"

export class createUserDto {
    
    @IsNotEmpty()
    readonly userName: string
    
    @IsNotEmpty()
    readonly password: string
}