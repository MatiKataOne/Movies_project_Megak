 

const moviesManager = require('./movies-manager');

async function updateDatabase() {
  const { movies, genres } = await moviesManager.moviesManager.getMovies();
  await moviesManager.moviesManager.saveMovies(movies, genres);
}

updateDatabase();


