import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../data/schemas/movie';
import { FilterOptions } from '../contract/FilterOptions';
import { MovieSummaryDto } from '../contract/MovieSummaryDto';
import { DataContext } from '../data/schemas/data.context';


@Injectable()
export class MoviesService {
  constructor(private readonly db: DataContext) {}

  async findAll(): Promise<Movie[]> {
    return this.db.movies.find().exec();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.db.movies.findById(id).exec();
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async findAllWithPagination(filterOptions: FilterOptions): Promise<{
    data: MovieSummaryDto[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const page = filterOptions.page || 1;
    const limit = filterOptions.limit || 10;
    const skip = (page - 1) * limit;

    const filters = await this.getFilters(filterOptions);
    const movieSummaries = await this.getResultItems(filters, skip, limit);
    const total = await this.db.movies.countDocuments(filters);
    const totalPages = Math.ceil(total / limit);
    return {
      data: movieSummaries,
      total,
      page,
      totalPages,
    };
  }

  private async getResultItems(filters: {}, skip: number, limit: number) {
    const moviesFromDb = await this.db.movies
      .find(filters)
      .skip(skip)
      .limit(limit)
      .exec();
    const genresFromDb = await this.db.genres.find().exec();
    const languagesFromDb = await this.db.languages.find().exec();
    const countriesFromDb = await this.db.countries.find().exec();
    const movieSummaries: MovieSummaryDto[] = moviesFromDb.map((doc) => {
      let x: MovieSummaryDto;
      let dicts ={ genres : genresFromDb
        .filter((a) => doc.genres.includes(a._id))
        .map((x) => x.name),
       langs : languagesFromDb
        .filter((a) => doc.languages.includes(a._id))
        .map((x) => x.name),
       countries : countriesFromDb
        .filter((a) => doc.countries.includes(a._id))
        .map((x) => x.name)
      }
      x = {
        title: doc.title,
        homepage: doc.homepage,
        runtime: doc.runtime,
        budget: doc.budget,
        genres: dicts.genres,
        countries: dicts.countries,
        languages: dicts.langs,
        id: doc.id
      };
      return x;
    });
    return movieSummaries;
  }

  private async getFilters(filterOptions: FilterOptions) {
    const filters = {};
    if (filterOptions.language) {
      const languages = await this.db.languages
        .find({ name: filterOptions.language })
        .exec();
      if(languages.length>0)
        filters['languages'] = languages[0]._id;
    }
    if (filterOptions.genre) {
      const genres = await this.db.genres
        .find({ name: filterOptions.genre })
        .exec();
      if(genres.length>0)
        filters['genres'] = genres[0]._id;
    }
    if (filterOptions.country) {
      const countries = await this.db.countries
        .find({ name: filterOptions.country })
        .exec();
      if(countries.length>0)
        filters['countries'] = countries[0]._id;
    }
    return filters;
  }
}
