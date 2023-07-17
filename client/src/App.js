import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/header';

//https://api.themoviedb.org/3/movie/550?api_key=468ab2e093f216f9e2f589a684c85d92

function App() {
	//const [listOfUsers, setListOfUsers] = useState([]);
	const [listOfMovies, setListOfMovies] = useState([]);
	//const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [movie, setMovieName] = useState("");
	const [rating, setRating] = useState(0)
	const [review, setReview] = useState("");
	const [posterURL, setPosterURL] = useState("");
	//const [color, setColor] = useState("black");

	useEffect(() => {
		Axios.get("http://localhost:3001/getMovies").then((response) => {
			setListOfMovies(response.data);
		});
	}, []);

	/*const createUser = () => {
		Axios.post("http://localhost:3001/createUser", {
			name,
			username,
		}).then((response) => {
			setListOfUsers([
				...listOfUsers,
				{
					name,
					username,
				},
			]);
		});
	};*/

	const logMovie = () => {
		Axios.get(
		  `https://api.themoviedb.org/3/search/movie?api_key=468ab2e093f216f9e2f589a684c85d92&query=${encodeURIComponent(
			movie
		  )}`
		)
		  .then((response) => {
			if (response.data.results && response.data.results.length > 0) {
			  const movieDetails = response.data.results[0];
			  const posterURL = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
	  
			  Axios.post("http://localhost:3001/logMovie", {
				username,
				movie,
				rating,
				review,
				posterURL,
			  }).then((response) => {
				setListOfMovies([
				  ...listOfMovies,
				  {
					username,
					movie,
					rating,
					review,
					posterURL,
				  },
				]);
			  });
			}
		  })
		  .catch((error) => {
			console.error(error);
		  });
	  };

	//Removes movie from MongoDB and updates list
	const deleteMovie = (movieUsername, movieName) => {
		Axios.delete('http://localhost:3001/deleteMovie', {
			data: {
			username: movieUsername,
			movie: movieName
			}
		})
		.then((response) => {
			if (response.status === 200) {
			setListOfMovies((prevMovies) =>
				prevMovies.filter((movie) =>
				movie.username !== movieUsername || movie.movie !== movieName
				)
			);
			}
		})
		.catch((error) => {
			console.error(error);
		});
	};

	/*const movieDB = () => {
		fetch('https://api.themoviedb.org/3/movie/550?api_key=468ab2e093f216f9e2f589a684c85d92')
		.then(response => {
			return response.json();
		})
		.then(movieLog => {
			console.log(movieLog);
		})
		
	};*/

	const movieDB = () => {
		const fetch = require('node-fetch');

		const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjhhYjJlMDkzZjIxNmY5ZTJmNTg5YTY4NGM4NWQ5MiIsInN1YiI6IjY0YWM1OWVhNmEzNDQ4MDBjOWZjMWYxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r3WgVRKyIJ_fJHgj6-LiWbz1_ZlMJv_Mw86zlmc0n6s'
			}
		};

		fetch(url, options)
		.then(res => res.json())
		.then(json => console.log(json))
		.catch(err => console.error('error:' + err));
	}
	
	/*common = {
		api_key: "468ab2e093f216f9e2f589a684c85d92",
		base_uri: "http://api.themoviedb.org/3/",
		images_uri: "http://image.tmdb.org/t/p/",
		timeout: 5000,
		generateQuery: function (options) {
			'use strict';
			var myOptions, query, option;
	
			myOptions = options || {};
			query = "?api_key=" + theMovieDb.common.api_key;
	
			if (Object.keys(myOptions).length > 0) {
				for (option in myOptions) {
					if (myOptions.hasOwnProperty(option) && option !== "id" && option !== "body") {
						query = query + "&" + option + "=" + myOptions[option];
					}
				}
			}
			return query;
		},
	}*/



	return (
		<div className="App">
			<Header />
			<div className="header">
				<input
					type="text"
					placeholder="Username..."
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Movie Watched..."
					onChange={(event) => {
						setMovieName(event.target.value);
					}}
				/>
				<input
					type="number"
					placeholder="Rating..."
					onChange={(event) => {
						setRating(event.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Review..."
					onChange={(event) => {
						setReview(event.target.value);
					}}
				/>
				<button onClick={logMovie}> Log Movie </button>
				<button onClick={movieDB}> Connect to MovieDB </button>
			</div>

			<div className="body">
				{listOfMovies.toReversed().map((movies) => {
					return (
						<div className="movie-container">
							<div className="movie-details">
								<h1>{movies.username} watched {movies.movie}</h1>
								<h1>On </h1>
								<h1>Rating: {movies.rating}</h1>
								<h1>Review: {movies.review}</h1></div>
								<button onClick={() => deleteMovie(movies.username, movies.movie)}> X </button>

							<div className="poster">
								<img src={movies.posterURL} alt="Movie Poster" width="250" height="375" />
							</div>

							<br></br>
							<br></br>
						</div>
					);
				})}
			</div>

			<div className="footer">
				{/* Footer content */}
			</div>
		</div>
	);
}

export default App;