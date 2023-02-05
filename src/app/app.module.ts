import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose"
import { MongooseConfigService } from 'src/config/MongooseConfigService';
import configuration from 'src/config/configuration';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { CostsModule } from 'src/costs/costs.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService
    }),
    ConfigModule.forRoot({
      load: [configuration]
    }),
    UsersModule,
    AuthModule,
    CostsModule
  ],
})
export class AppModule { }
