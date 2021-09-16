
const router = require("express").Router();
const axios = require('axios')
//use the code from the homeSearchResults
//export movieSearch

const movieSearch = (movie) => {
//this below code you will paste in again once Jon´s done from homeSearchResults




        const movieQuery = movie.split(' ').join('+');
        // console.log(movieQuery);
        const posterLink = `https://www.themoviedb.org/t/p/w1280`;
        // console.log('Link:',link);


        function searchMovie(array) {
        const result = []
        for (let movie in array) {
        result.push(
            {
            movie_Id:array[movie].id,
            title:array[movie].title,
            score:array[movie].vote_average,
            genre:array[movie].genre_ids,
            posterUrl:posterLink + `${array[movie].poster_path}`
            })

            
        }   
        return result                      
        }
         axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_Key}&query=${movieQuery}`)
        
        .then((response) => {
            // var array = response
        
            //console.log('Result:',searchMovie(response.data.results))
            //console.log('The response from the API: ',response.data);

            const queryLink = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_Key}&query=${movieQuery}`
            //console.log ('Data link:', queryLink);
            
            const results = searchMovie(response.data.results);
        //res.render('index', { results: results});
            return results;
        })

        .catch((err) =>
            console.log('The error while searching artists occurred: ', err)
        );

    };



module.exports = movieSearch