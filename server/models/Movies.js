const mongoose = require ('mongoose')

const MovieSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
   },
   date:  {
      type: String,
      required: false,
   },
   movie:  {
      type: String,
      required: true,
   },
   year:  {
      type: Number,
      required: false,
   },
   director:  {
      type: String,
      required: false,
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