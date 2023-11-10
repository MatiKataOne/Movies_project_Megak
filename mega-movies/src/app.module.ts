
import { Module } from '@nestjs/common';
import { MovieModule } from './data/movie.schema.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
      MovieModule],
  controllers: [
     ],
  providers: [
     ],
})
export class AppModule { }
