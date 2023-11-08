const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movie_database', {
});

const languageSchema = new mongoose.Schema({
  name: String,
});

const countrySchema = new mongoose.Schema({
  name: String,
});

const actorSchema = new mongoose.Schema({
  name: String,
  photo: String, 
});

const genreSchema = new mongoose.Schema({
  name: String,
});

const movieSchema = new mongoose.Schema({
  title: String,
  poster: String, 
  thumbnail: String, 
  description: String,
  rating: Number,
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  countries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }],
  languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language' }],
});

const Language = mongoose.model('Language', languageSchema);
const Country = mongoose.model('Country', countrySchema);
const Actor = mongoose.model('Actor', actorSchema);
const Genre = mongoose.model('Genre', genreSchema);
const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie, Language, Country, Actor, Genre };

