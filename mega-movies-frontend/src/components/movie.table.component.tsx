import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { MoviesService } from '../services/movie.service';
import { FilterOptions } from '../services/contract/FilterOptions';
import { MoviesResult } from '../services/contract/MoviesResult';
import { MovieSummaryDto } from '../services/contract/MovieSummaryDto';
import FilterForm from "./filter.form.component";
import {lime} from "@mui/material/colors";

const MovieTable = () => {
    const opts: FilterOptions={};
    const [movies, setMovies] = useState<MovieSummaryDto[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [filterOpts, setFilterOptions] = useState(opts)

    useEffect(() => {
        const fetchMovies = async () => {
            const filterOptions: FilterOptions = filterOpts;
            filterOptions.page=page;
            filterOptions.limit=rowsPerPage;
            const result = await MoviesService.findAll(filterOptions);
            if(result) {
                setMovies(result.data);
                setTotalPages(result.totalPages);
            }
        };

        fetchMovies();
    }, [page, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event: FilterOptions)=>{
        setFilterOptions(event);
        setPage(1);
        setRowsPerPage(10);
    }

    return (
        <Paper>
            <FilterForm onEvent={handleSearch}/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Runtime</TableCell>
                            <TableCell align="right">Budget</TableCell>
                            <TableCell>Languages</TableCell>
                            <TableCell>Countries</TableCell>
                            <TableCell>Genres</TableCell>
                            <TableCell>Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies.map((movie) => (
                            <TableRow key={movie.id}>
                                <TableCell component="th" scope="row">
                                    {movie.title}
                                </TableCell>
                                <TableCell align="right">{movie.runtime}</TableCell>
                                <TableCell align="right">{movie.budget}</TableCell>
                                <TableCell>{movie.languages.join(', ')}</TableCell>
                                <TableCell>{movie.countries.join(', ')}</TableCell>
                                <TableCell>{movie.genres?.join(', ')}</TableCell>
                                <TableCell><a href={movie.homepage}>Visit</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalPages * rowsPerPage}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default MovieTable;
