import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { DictionariesService } from '../services/dictionaries.service';
import { FilterOptions } from '../services/contract/FilterOptions';
import {Country, Genre, Language} from "../services/contract/dictionaries";

// @ts-ignore
const FilterForm = ({onEvent}) => {
    const [languages, setLanguages] = useState(new Array<Language>());
    const [genres, setGenres] = useState(new Array<Genre>());
    const [countries, setCountries] = useState(new Array<Country>());
    const [filters, setFilters] = useState({ language: '', genre: '', country: '' });

    useEffect(() => {
        const fetchData = async () => {
            const fetchedLanguages = await DictionariesService.findAllLanguages();
            const fetchedGenres = await DictionariesService.findAllGenres();
            const fetchedCountries = await DictionariesService.findAllCountries();

            // @ts-ignore
            setLanguages(fetchedLanguages);
            // @ts-ignore
            setGenres(fetchedGenres);
            // @ts-ignore
            setCountries(fetchedCountries);
        };

        fetchData();
    }, []);

    // @ts-ignore
    const handleChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    const handleSubmit = (x: any) => {
        const filterOptions:FilterOptions = {
            language:filters.language,
            genre:filters.genre,
            country:filters.country
        };
    console.log(x);
        onEvent(filterOptions);
    };

    return (
        <form>
            <FormControl variant="standard"  sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="language-label">Język</InputLabel>
                <Select
                    labelId="language-label"
                    name="language"
                    value={filters.language}
                    onChange={handleChange}
                >
                    {languages.map((language) => (
                        <MenuItem key={language.name} value={language.name}>
                            {language.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="standard"  sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="genre-label">Gatunek</InputLabel>
                <Select
                    labelId="genre-label"
                    name="genre"
                    value={filters.genre}
                    onChange={handleChange}
                >
                    {genres.map((genre) => (
                        <MenuItem key={genre.name} value={genre.name}>
                            {genre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="standard"  sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="country-label">Kraj</InputLabel>
                <Select
                    labelId="country-label"
                    name="country"
                    value={filters.country}
                    onChange={handleChange}
                >
                    {countries.map((country) => (
                        <MenuItem key={country.name} value={country.name}>
                            {country.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button variant="outlined" sx={{ m: 1, minWidth: 120 }} onClick={handleSubmit}>
                Szukaj
            </Button>
        </form>
    );
};

export default FilterForm;
