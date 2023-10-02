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
	const [date, setDate] = useState("");
	const [year, getYear] = useState(0);
	const [director, getDirector] = useState("");
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
		  `https://api.themoviedb.org/3/search/movie?api_key=468ab2e093f216f9e2f589a684c85d92&query=${encodeURIComponent(movie)}`
		)
		  .then((response) => {
				if (response.data.results && response.data.results.length > 0) {
					const currentDate = new Date();
					//const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
					const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					const date = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
					const movieDetails = response.data.results[0];
					const posterURL = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
					const year = movieDetails.release_date.split("-")[0];
	  
				// Save the movie data once
				Axios.post("http://localhost:3001/logMovie", {
					username,
					date,
					movie,
					year,
					director,
					rating,
					review,
					posterURL,
				}).then(() => {
					// Re-fetch all reviews
					setReview("");
					setMovieName("");
					setRating(0);
					Axios.get("http://localhost:3001/getMovies").then(response => {
						setListOfMovies(response.data);
					});
			  	}).catch(error => {
					console.error(error);
			  	});
			}
		}).catch((error) => {
			console.error(error);
		});
	};

	//Removes movie from MongoDB and updates list
	const deleteMovie = (movieId) => {
		Axios.delete('http://localhost:3001/deleteMovie', {
			data: {
				_id: movieId
			}
		})
		.then((response) => {
			if (response.status === 200) {
				setListOfMovies((prevMovies) =>
					prevMovies.filter((movie) => movie._id !== movieId)
				);
			}
			console.log(response.data);
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

			<div className="review">
				<div className="left-section">
					<label>
						Name: 
						<input
							type="text"
							placeholder=""
							onChange={(event) => {
								setUsername(event.target.value);
							}}
						/>
					</label>
					
					<label>
						Movie: 
						<input
							type="text"
							value={movie} 
							placeholder=""
							onChange={(event) => {
								setMovieName(event.target.value);
							}}
						/>
					</label>

					<label>
					Rating: 
						<input
							type="number"
							min="1"
							max="5"
							value={rating} 
							placeholder=""
							onChange={(event) => {
								setRating(event.target.value);
							}}
						/>
					</label>
				</div>

				<div className="right-section">
					<label>
						Review:
						<br />
						<textarea 
							rows="4" 
							cols="50"
							value={review} 
							placeholder=""
							onChange={(event) => {
								setReview(event.target.value);
							}}
						/>
					</label>

					<button onClick={logMovie}> Rate </button>
				</div>
			</div>

			<div className="reviews">
				<label for="Reviews">Reviews:</label>
				{listOfMovies.toReversed().map((movies) => {
					return (
						<div className="review">
							<div className="moviedata">
								<img src={movies.posterURL} alt="Movie Poster" className="poster" />
								<label>{movies.movie}</label>
								<label>({movies.year})</label>
								<label>{movies.director}</label>
							</div>

							<div className="review-post">
								<label>{movies.date}</label>
								<br></br>
								<label>@{movies.username}</label>
								<label>{movies.review}</label>
								<label>{movies.rating}/5</label>
							</div>

							<div className="remove">
								<button onClick={() => deleteMovie(movies._id)}> Remove </button>
							</div>
						</div>
					);
				})}
			</div>

			<div className="footer">
				{<label>Affan Malik © 2023</label>}
			</div>
		</div>
	);
}

export default App;