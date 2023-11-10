import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../data/schemas/movie';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('language') language?: string,
    @Query('genre') genre?: string,
    @Query('country') country?: string
  ) {
    return this.moviesService.findAllWithPagination({ page, limit, language, genre, country });
  }

}

