const router = require("express").Router();
const axios = require('axios');
const TMDBApi_key = process.env.API_Key;
// router.get("/movie-search", (req, res, next) => {
//     res.render("searchResults");
//   });
  router.get('/profile/:id/movie-search', (req, res) => {
    const movie = req.query.movie;
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
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDBApi_key}&query=${movieQuery}`)
      
      .then((response) => {
        // var array = response
       
        console.log('Result:',searchMovie(response.data.results))
        console.log('The response from the API: ',response.data);
        
        
        const results = searchMovie(response.data.results)
       res.render('searchResults', { results: results});
      })
  
      .catch((err) =>
        console.log('The error while searching artists occurred: ', err)
      );
  });
  module.exports = router;
