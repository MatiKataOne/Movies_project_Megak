import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from '../services/languages.service';
import { GenresService } from '../services/genres.service';
import { CountriesService } from '../services/countries.service';

@Controller('meta-data')
export class DictionariesController {
  constructor(
    private readonly languagesService: LanguagesService,
    private readonly genresService: GenresService,
    private readonly countriesService: CountriesService,
  ) {}

  @Get('/languages')
  async findAllLanguages() {
    return this.languagesService.findAll();
  }

  @Get('/genres')
  async findAllGenres() {
    return this.genresService.findAll();
  }

  @Get('/countries')
  async findAllCountries() {
    return this.countriesService.findAll();
  }
}
