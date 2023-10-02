const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const ObjectId = require('mongoose').Types.ObjectId;

//const UserModel = require("./models/Users");.
const MovieModel = require("./models/Movies");

app.use(express.json());
app.use(cors());

//mongoose.connect("mongodb+srv://userone:sesamestreet123@cluster0.tdij5nj.mongodb.net/test");
//mongoose.connect("mongodb+srv://userone:sesamestreet123@cluster0.tdij5nj.mongodb.net/database1?retryWrites=true&w=majority");
mongoose.connect("mongodb+srv://test:MjOMlbuyotWJtEuy@cluster0.tdij5nj.mongodb.net/database1?retryWrites=true&w=majority")

/*app.get("/getUsers", (req, res) => {
   UserModel.find().exec()
   .then(results => {
	  res.json(results)
   })
   .catch(error => {
	  res.json(error)
   });
});*/

app.get("/getMovies", (req, res) => {
	MovieModel.find().exec()
	.then(results => {
		res.json(results)
	})
	.catch(error => {
		res.json(error)
	});
});

/*app.post("/createUser", async (req, res) => {
   const user = req.body;
   const newUser = new UserModel(user);
   await newUser.save();

   res.json(user);
});*/

app.post("/logMovie", async (req, res) => {
	const movie = req.body;
	const newMovie = new MovieModel(movie);
	await newMovie.save();

	res.json(movie);
});

app.delete("/deleteMovie", async (req, res) => {
	const movieId = req.body._id;

	// Use ObjectId to convert the string id to a MongoDB ObjectId
	const deletedMovie = await MovieModel.findByIdAndDelete(new ObjectId(movieId));

	// Check if a movie was actually deleted.
	if (deletedMovie) {
		res.json({ success: true, message: "Movie deleted successfully." });
	} else {
		res.status(404).json({ success: false, message: "Movie not found." });
	}
});

app.listen(3001, () => {
	console.log("Server Running");
});

/*class Board extends React.Component {
   renderSquare(i) {
	  return <Square value={i} />;
   }
}

class Square extends React.Component {
   render() {
	  return (
		 <button className="square">
			{this.props.value}
		 </button>
	  )
   }
}*/