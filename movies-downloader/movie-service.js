
const axios = require('axios');
const { Movie, Language, Country, Actor, Genre } = require('./database/database');

class MovieService{

    API_KEY = 'API_KEY';

    
     async fetchMovieCredits(movieId) {
      try {
        const response = await axios.get(`http://api.themoviedb.org/3/movie/${movieId}/credits`, {
          params: {
            api_key: this.API_KEY,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching movie credits:', error.message);
        return {};
      }
    }

    async fetchMovieGenres() {
        try {
          const response = await axios.get('http://api.themoviedb.org/3/genre/movie/list', {
            params: {
              api_key: this.API_KEY,
            },
          });
          return response.data.genres;
        } catch (error) {
          console.error('Error fetching movie genres:', error.message);
          return [];
        }
      }
    
    async fetchMoviesByReleaseDate(startDate, endDate, page) {
      try {
        const response = await axios.get('http://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: this.API_KEY,
            'primary_release_date.gte': startDate,
            'primary_release_date.lte': endDate,
            page: page
          },
        });
        return {data:response.data.results, page:response.data.page, total_pages: response.data.total_pages };
      } catch (error) {
        console.error('Error fetching movies by release date:', error.message);
        return {data:[], page: 0, total_pages:0 };
      }
    }
    async fetchMovieDetails(movieId) {
        try {
          const response = await axios.get(`http://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
              api_key: this.API_KEY,
            },
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching movie details:', error.message);
          return {};
        }
      }
      async fetchActorData(actorName) {
        try {
          const response = await axios.get('http://api.themoviedb.org/3/search/person', {
            params: {
              api_key: this.API_KEY,
              query: actorName,
            },
          });
      
          const actorData = response.data.results[0];
      
          if (actorData) {
            const { name, profile_path } = actorData;
            return {
              name,
              photo: `https://image.tmdb.org/t/p/w185${profile_path}`,
            };
          }
      
          return null; // Return null if actor data is not found
        } catch (error) {
          console.error(`Error fetching actor data for ${actorName}:`, error.message);
          return null;
        }
      }

}

const movieService = new MovieService();
module.exports = {  movieService };