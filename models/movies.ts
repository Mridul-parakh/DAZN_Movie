var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  strem_link: { type: String, required: true }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('movies', MoviesSchema);

