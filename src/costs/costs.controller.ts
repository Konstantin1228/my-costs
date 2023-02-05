import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Delete, Param, Patch } from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/auth.service';
import { JWTguard } from 'src/auth/guards/jwt.guard';
import { CostsService } from './costs.service';
import { CreateCostDto } from './dto/createCosts.dto';
import { updateCostDto } from './dto/updateCost.dto';

@Controller('cost')
export class CostsController {
    constructor(private readonly costsService: CostsService, private readonly authService: AuthService) { }

    @UseGuards(JWTguard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllCosts(@Req() req, @Res() res) {
        const token = req.token
        const user = await this.authService.getUserByTokenData(token)
        const costs = await this.costsService.findAll()
        const filtredCosts = costs.filter(cost => cost.userId === user._id.toString())

        return res.send(filtredCosts)
    }

    @UseGuards(JWTguard)
    @Post()
    @HttpCode(HttpStatus.OK)
    async createCost(@Body() createCostDto: CreateCostDto, @Req() req) {
        const user = await this.authService.getUserByTokenData(req.token)

        return await this.costsService.create({
            ...createCostDto,
            userId: user._id as string,
        })
    }

    @UseGuards(JWTguard)
    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    async updateCost(@Body() updateCostDto: updateCostDto, @Param("id") id: string) {
        return await this.costsService.update(updateCostDto, id)
    }

    @UseGuards(JWTguard)
    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async deleteCost(@Param("id") id: string) {
        return await this.costsService.delete(id)
    }
}
