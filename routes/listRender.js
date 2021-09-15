const router = require("express").Router();
const axios = require('axios');
const TMDBApi_key = process.env.API_Key;
// router.get("/movie-search", (req, res, next) => {
//     res.render("searchResults");
//   });
router.get('/movie-search-id', (req, res) => {
    const movieId = req.query.movieId;
    const movieQuery = movieId;
    console.log(movieQuery);
    const posterLink = `https://www.themoviedb.org/t/p/w1280`;
    // console.log('Link:',link);



    function searchMovie(movie) {
        const result = []
         
        result.push(
            {
            movie_Id:movie.id,
            title:movie.title,
            score:movie.vote_average,
            genre:movie.genres,
            posterUrl:posterLink + `${movie.poster_path}`
            })

      
          
    return result                      
    }
// function movieRender (array){
//         const movieList = array
//         for (let id in movieList){

    
    
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDBApi_key}&language=en-US`)
      
        .then((response) => {
         // var array = response
     
         console.log('Result:',searchMovie(response.data))
         console.log('The response from the API: ',response.data);

         const idQueryLink = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDBApi_key}&language=en-US`
         console.log ('Data link:', idQueryLink);
  
      
      
         const results = searchMovie(response.data)
         res.render('index', { results: results});
        })

        .catch((err) =>
         console.log('The error while searching artists occurred: ', err)
        );
    // }
});


module.exports = router;






// The response from the API:  {
//     adult: false,
//     backdrop_path: '/xIoWDHSA2ymOewcCpoUID4PpDb3.jpg',
//     belongs_to_collection: {
//       id: 722961,
//       name: 'Space Jam Collection',
//       poster_path: '/1eq1pEctWy8umAjfIncFk273QOa.jpg',
//       backdrop_path: '/dGntz0meh8NjiFJHM8OPbbvfa86.jpg'
//     },
//     budget: 80000000,
//     genres: [
//       { id: 35, name: 'Comedy' },
//       { id: 10751, name: 'Family' },
//       { id: 16, name: 'Animation' },
//       { id: 878, name: 'Science Fiction' }
//     ],
//     homepage: 'https://spacejam.com',
//     id: 2300,
//     imdb_id: 'tt0117705',
//     original_language: 'en',
//     original_title: 'Space Jam',
//     overview: "Jokes fly as the Tune Squad takes on the Nerdlucks in a hardcourt game to decide if the Looney Tunes remain here... or become attractions at a far-off galactic off-ramp called Moron Mountain. The Nerdlucks have a monstrous secret weapon: they've stolen the skills of top NBA stars like Charles Barkley and Patrick Ewing and become Monstars. But that's not all, folks. The Tune Squad’s secret weapon just happens to be the finest player in this or any other universe. He's outta this world. So's the fun.",
//     popularity: 60.039,
//     poster_path: '/4RN5El3Pj2W4gpwgiAGLVfSJv2g.jpg',
//     production_companies: [
//       {
//         id: 174,
//         logo_path: '/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png',
//         name: 'Warner Bros. Pictures',
//         origin_country: 'US'
//       },
//       {
//         id: 8816,
//         logo_path: null,
//         name: 'Northern Lights Entertainment',
//         origin_country: 'US'
//       },
//       {
//         id: 55527,
//         logo_path: null,
//         name: 'Courtside Seats Productions',
//         origin_country: ''
//       },
//       {
//         id: 2785,
//         logo_path: '/l5zW8jjmQOCx2dFmvnmbYmqoBmL.png',
//         name: 'Warner Bros. Animation',
//         origin_country: 'US'
//       }
//     ],
//     production_countries: [ { iso_3166_1: 'US', name: 'United States of America' } ],
//     release_date: '1996-11-15',
//     revenue: 250200000,
//     runtime: 88,
//     spoken_languages: [ { english_name: 'English', iso_639_1: 'en', name: 'English' } ],
//     status: 'Released',
//     tagline: '',
//     title: 'Space Jam',
//     video: false,
//     vote_average: 6.9,
//     vote_count: 4644
//   }