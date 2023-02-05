import { IsNotEmpty } from "class-validator"

export class updateCostDto {
    @IsNotEmpty()
    private text: string
    
    @IsNotEmpty()
    private price: number

    @IsNotEmpty()
    private date: Date

}