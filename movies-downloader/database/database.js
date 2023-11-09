const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://zarazsiewnerwie:zNtbNHT6eEqFcvNK@cluster0.8pvfntf.mongodb.net/movies_database?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 60000, 
  socketTimeoutMS: 60000,
  tls:false
});

const languageSchema = new mongoose.Schema({
  name: { type: String, index: true }
});

const countrySchema = new mongoose.Schema({
  name: { type: String, index: true }
});

const actorSchema = new mongoose.Schema({
  name: { type: String, index: true },
  photo: String, 
});

const genreSchema = new mongoose.Schema({
  name: { type: String, index: true }
});

const movieSchema = new mongoose.Schema({
  title: String,
  poster: String, 
  description: String,
  rating: Number,
  homepage: String,
  runtime: Number,
  budget: Number,
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' , index: true}],
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre', index: true }],
  countries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country', index: true }],
  languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language', index: true }],
});

const Language = mongoose.model('Language', languageSchema);
const Country = mongoose.model('Country', countrySchema);
const Actor = mongoose.model('Actor', actorSchema);
const Genre = mongoose.model('Genre', genreSchema);
const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie, Language, Country, Actor, Genre };

