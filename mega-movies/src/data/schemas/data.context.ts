import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Movie } from "./movie";
import { Model } from "mongoose";
import { Genre } from "./Genre";
import { Actor } from "./actor";
import { Country } from "./Country";
import { Language } from "./Language";

@Injectable()
export class DataContext{

  constructor(
    @InjectModel(Movie.name) private _movies: Model<Movie>,
    @InjectModel(Genre.name) private _genres: Model<Genre>,
    @InjectModel(Actor.name) private _actors: Model<Actor>,
    @InjectModel(Country.name) private _countries: Model<Country>,
    @InjectModel(Language.name) private _languages: Model<Language>,
  ) {}


  get movies(): Model<Movie> {
    return this._movies;
  }

  get genres(): Model<Genre> {
    return this._genres;
  }

  get actors(): Model<Actor> {
    return this._actors;
  }

  get countries(): Model<Country> {
    return this._countries;
  }

  get languages(): Model<Language> {
    return this._languages;
  }
}