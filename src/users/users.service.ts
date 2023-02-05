import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose"
import { Model } from 'mongoose';
import { createUserDto } from 'src/auth/dto/createUser.dto';
import { loginUserDto } from 'src/auth/dto/loginUserDto';
import { User, UsersDocument } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UsersDocument>) { }

    async login(loginUserDto: loginUserDto): Promise<User | null> {
        const user = await this.userModel.collection.findOne(loginUserDto)
        if (!user) throw new BadRequestException("user is not created")

        return user as User
    }

    async registration(craeteUserDto: createUserDto): Promise<User | null> {
        const createdUser = new this.userModel(craeteUserDto)
        return createdUser.save()
    }

    async findOne(userName: string): Promise<User> {
        return this.userModel.findOne({ userName })
    }
}
