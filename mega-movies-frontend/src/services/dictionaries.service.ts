import axios from 'axios';
import {Country, Genre, Language} from "./contract/dictionaries";

export class DictionariesService {
    static BASE_URL = '/meta-data'; // Adjust as needed

    static async findAllLanguages(): Promise<Language[]> {
        try {
            const response = await axios.get<Language[]>(`${this.BASE_URL}/languages`);
            return response.data;
        } catch (error) {
            console.error('Error fetching languages:', error);
            return [];
        }
    }

    static async findAllGenres(): Promise<Genre[]> {
        try {
            const response = await axios.get<Genre[]>(`${this.BASE_URL}/genres`);
            return response.data;
        } catch (error) {
            console.error('Error fetching genres:', error);
            return [];
        }
    }

    static async findAllCountries(): Promise<Country[]> {
        try {
            const response = await axios.get<Country[]>(`${this.BASE_URL}/countries`);
            return response.data;
        } catch (error) {
            console.error('Error fetching countries:', error);
            return [];
        }
    }
}
