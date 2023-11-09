 

const moviesManager = require('./movies-manager');

async function updateDatabase() {
  const genres = await moviesManager.moviesManager.getGenres();

  let result = await moviesManager.moviesManager.getMovies(1);
  await moviesManager.moviesManager.saveMovies(result.data, genres);

  for(let i = 2; i<= result.total_pages;i++){
    result = await moviesManager.moviesManager.getMovies(i);
    await moviesManager.moviesManager.saveMovies(result.data, genres);
  }

}

updateDatabase();


