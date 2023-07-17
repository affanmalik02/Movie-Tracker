const mongoose = require ('mongoose')

const MovieSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
   },
   movie:  {
      type: String,
      required: true,
   },
   rating:  {
      type: Number,
      required: true,
   },
   review:  {
      type: String,
      required: false,
   },
   posterURL:  {
      type: String,
      required: false,
   }
});

const MovieModel = mongoose.model("movieLog", MovieSchema);
module.exports = MovieModel;