import { SchemaFactory } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Language } from './schemas/Language';
import { Country } from './schemas/Country';
import { Actor } from './schemas/actor';
import { Genre } from './schemas/Genre';
import { Movie } from './schemas/movie';
import { MoviesService } from '../services/movies.service';
import { MoviesController } from 'src/controllers/movies.controller';
import { DataContext } from "./schemas/data.context";
import { DictionariesController } from "../controllers/dictionaries.controller";
import { LanguagesService } from "../services/languages.service";
import { GenresService } from "../services/genres.service";
import { CountriesService } from "../services/countries.service";

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
  controllers:[MoviesController, DictionariesController],
  providers: [MoviesService, DataContext, LanguagesService, GenresService, CountriesService]
})
export class MovieModule {}
