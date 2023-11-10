import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './data/schemas/movie.schema.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/movies_database', { }),
      MovieModule],
  controllers: [
     AppController],
  providers: [
     AppService],
})
export class AppModule { }
