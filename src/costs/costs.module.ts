import { Module } from '@nestjs/common';
import { CostsController } from './costs.controller';
import { CostsService } from './costs.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Cost, costsSchema } from 'src/schemas/costs.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cost.name, schema: costsSchema }]),
    AuthModule
  ],
  controllers: [CostsController],
  providers: [CostsService]
})
export class CostsModule { }
