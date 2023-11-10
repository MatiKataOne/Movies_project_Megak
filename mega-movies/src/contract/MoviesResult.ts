import { Movie } from '../data/schemas/movie';
import { MovieSummaryDto } from './MovieSummaryDto';

export interface MoviesResult {
    data: MovieSummaryDto[];
    total: number;
    page: number;
    totalPages: number;
}
