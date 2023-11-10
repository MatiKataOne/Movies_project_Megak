import axios from 'axios';
import { MoviesResult } from './contract/MoviesResult';
import { FilterOptions } from './contract/FilterOptions';
import { MovieSummaryDto } from './contract/MovieSummaryDto';

const BASE_URL = 'http://localhost:3000/movies'; // This should be the URL of your NestJS backend

export class MoviesService {
    static async findOne(id: string): Promise<MovieSummaryDto | null> {
        try {
            const response = await axios.get<MovieSummaryDto>(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    }

    static async findAll(filterOptions: FilterOptions = {}): Promise<MoviesResult | null> {
        try {
            const response = await axios.get<MoviesResult>(BASE_URL, { params: filterOptions });
            return response.data;
        } catch (error) {
            console.error('Error fetching movies:', error);
            return null;
        }
    }
}
