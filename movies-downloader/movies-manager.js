const { Movie, Language, Country, Actor, Genre } = require('./database/database');
const movieService = require('./movie-service');

class MoviesDbManager {
  async saveMovies(movies, genres) {
    for (const movieData of movies) {
      const { id, title, overview, poster_path } = movieData;
      const movieDetails = await movieService.movieService.fetchMovieDetails(id);
      const movieCredits = await movieService.movieService.fetchMovieCredits(id);

      const movie = new Movie({
        title,
        poster: `https://image.tmdb.org/t/p/original${poster_path}`,
        description: overview,
        actors: [],
        genres: [],
        countries: [],
        languages: [],
      });

      await this.saveGenres(movieData, genres, movie);
      await this.saveActors(movieCredits.cast.map((actor) => actor.name), movie);
      await this.saveCountries(movieDetails.production_countries, movie);
      await this.saveLanguages(movieDetails.spoken_languages, movie);

      try {
        await movie.save();
        console.log(`Movie "${title}" saved to the database.`);
      } catch (error) {
        console.error('Error saving movie to the database:', error.message);
      }
    }
  }

  async saveLanguages(spoken_languages, movie) {
    for (const language of spoken_languages) {
      let languageDocument = await Language.findOne({ name: language.name });
      if (!languageDocument) {
        languageDocument = new Language({ name: language.name });
        await languageDocument.save();
      }
      movie.languages.push(languageDocument);
    }
  }

  async saveCountries(production_countries, movie) {
    for (const country of production_countries) {
      let countryDocument = await Country.findOne({ name: country.name });
      if (!countryDocument) {
        countryDocument = new Country({ name: country.name });
        await countryDocument.save();
      }
      movie.countries.push(countryDocument);
    }
  }

  async saveActors(actors, movie) {
    for (const actorName of actors) {
      let actorData = await movieService.movieService.fetchActorData(actorName);
      if (actorData) {
        const { name, photo } = actorData;
        let actor = await Actor.findOne({ name: name });

        if (!actor) {
          actor = new Actor({
            name,
            photo: photo, // Add the photo field
          });
          await actor.save();
        }
        movie.actors.push(actor);
      }
    }
  }

  async saveGenres(movieData, genres, movie) {
    for (const genreId of movieData.genre_ids) {
      const matchingGenre = genres.find((genre) => genre.id === genreId);
      if (matchingGenre) {
        let genre = await Genre.findOne({ name: matchingGenre.name });
        if (!genre) {
          genre = new Genre({ name: matchingGenre.name });
          await genre.save();
        }
        movie.genres.push(genre);
      }
    }
  }

  async getMovies() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const startDate = startOfMonth.toISOString().split('T')[0];
    const endDate = endOfMonth.toISOString().split('T')[0];

    const genres = await movieService.movieService.fetchMovieGenres();

    const movies = await movieService.movieService.fetchMoviesByReleaseDate(startDate, endDate);
    return { movies, genres };
  }
}

const moviesManager = new MoviesDbManager();
module.exports = {  moviesManager };
