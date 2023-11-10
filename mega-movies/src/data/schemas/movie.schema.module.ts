import { SchemaFactory } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Language } from './Language';
import { Country } from './Country';
import { Actor } from './Actor';
import { Genre } from './Genre';
import { Movie } from './Movie';
import { MoviesService } from 'src/services/movies.service';
import { MoviesController } from 'src/controllers/movies.controller';
import { DataContext } from "./data.context";

export const LanguageSchema = SchemaFactory.createForClass(Language);
export const CountrySchema = SchemaFactory.createForClass(Country);
export const ActorSchema = SchemaFactory.createForClass(Actor);
export const GenreSchema = SchemaFactory.createForClass(Genre);
export const MovieSchema = SchemaFactory.createForClass(Movie);

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Language.name, schema: LanguageSchema },
      { name: Country.name, schema: CountrySchema },
      { name: Actor.name, schema: ActorSchema },
      { name: Genre.name, schema: GenreSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
  ],
  controllers:[MoviesController],
  providers: [MoviesService, DataContext]
})
export class MovieModule {}