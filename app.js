// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

const express = require('express');
const hbs = require("hbs");
const app = express();
const axios = require('axios');
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// setting the TMDB-api goes here:
const TMDBApi_key = process.env.API_Key;
 
// const TMDBApi = new TMDBApi({
//   API_Key: process.env.API_Key,
//   });
// const accessToken = spotifyApi.clientCredentialsGrant()
//   .then(data => spotifyApi.setAccessToken(data.body['access_token']))
//   .catch(error => console.log('Something went wrong when retrieving an access token', error));

// default value for title local
const projectName = "project2-moviesList";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);
// const movies = require("./routes/movies");
// app.use("/", movies);

app.get('/movie-search', (req, res) => {
  const movie = req.query.movie;
  const movieQuery = movie.split(' ').join('+');
  console.log(movieQuery);
  
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDBApi_key}&query=${movieQuery}`)
    
    .then((response) => {
      console.log('The response from the API: ',response.body);
    

     // res.render('artist-search-results', { data });
    })

    .catch((err) =>
      console.log('The error while searching artists occurred: ', err)
    );
});
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
