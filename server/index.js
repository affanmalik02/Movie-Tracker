const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const UserModel = require("./models/Users");
const MovieModel = require("./models/Movies");

const cors = require("cors");

app.use(express.json());
app.use(cors());

//mongoose.connect("mongodb+srv://userone:sesamestreet123@cluster0.tdij5nj.mongodb.net/test");
mongoose.connect("mongodb+srv://userone:sesamestreet123@cluster0.tdij5nj.mongodb.net/database1?retryWrites=true&w=majority");

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

app.delete("/deleteMovie/", async (req, res) => {
	const {username, movie } = req.body;

	const deletedMovie = await MovieModel.findOneAndDelete({
		username: username,
		movie: movie,
	});
	res.json(deletedMovie);
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