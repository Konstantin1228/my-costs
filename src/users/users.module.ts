import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose"
import { User, usersSchema } from 'src/schemas/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: usersSchema
  }])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
