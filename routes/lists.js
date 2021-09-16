const express = require('express');
const router = require("express").Router();
const User = require('../models/User.model');
const List = require('../models/List.model');
const movieSearch = require('./movieSearchFunction');
const axios = require('axios')

// Middleware to check if the user is logged in
const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}


/* Show Profile */

router.get('/profile/:id', loginCheck(), (req, res, next) => {
  //console.log('user: ', );
  const user = req.session.user;
  List.find( { owner: user._id } )
    .then(lists  => {
      res.render('profile', { lists , user } );
    })
    .catch(err => {
      next(err);
    });
});


/* Search page */

router.get('/search-movie', (req, res, next) => {
  res.render('search');
})





// /* Show Profile */

// router.get('/profile/:id', loginCheck(), (req, res, next) => {
//   //console.log('user: ', );
//   const user = req.session.user;
//   List.find( { owner: user._id } )
//     .then(lists  => {
//       res.render('profile', { lists , user } );
//     })
//     .catch(err => {
//       next(err);
//     });
// });


// /* Create new list from Profile view */

// router.post('/profile', (req, res, next) => {
//   //console.log(req.body, req.session.user._id);
//   const movies = [];
//   List.create({ title: req.body.listName, owner: req.session.user._id, movies: movies})
//     .then(() => {
//       res.redirect(`/profile/${req.session.user._id}`);
//     })
//     .catch(err => {
//       next(err);
//     });
// });





// /* Show specific List of user */

// router.get('/lists/:id', (req, res, next) => {   //add this yto the search button route in list view
//   const user = req.session.user;
//   const movie = 'Batman' //req.query.movie
//   const movieQuery = req.query.movie
  

//   //let results = movie ? movieSearch(movie) : [];  // after importing it from middlewares

//   List.findById(req.params.id)
//     .then(list => {
//       //console.log(req.params.id);
//       if (req.query.movie) {
//         axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_Key}&query=${movieQuery}`)
        
//         .then((response) => {
//             const results = searchMovie(response.data.results);
//             res.render('list', { list, user, results } );
//             return;
//         })
//         .catch(err => {
//           next(err);
//         });
//       }
//       //console.log('Test1: ', results)

//       const results = [];
//       res.render('list', { list, user, results } );
//     })
//     .catch(err => {
//       next(err);
//     });
// })





// /* Show specific List of user */

// router.get('/lists/:id', (req, res, next) => {
//   const user = req.session.user;

//  //
//   List.findById(req.params.id)
//     .then(list => {
//       //console.log(req.params.id);
//       res.render('list', { list, user } );
//     })
//     .catch(err => {
//       next(err);
//     });
// })






// router.post('/lists/:id', (req, res, next) => {

//   const { movieIdFromApi, rating } = req.body;
//   console.log(movieIdFromApi, rating);

//   List.findByIdAndUpdate(
//     req.params.id, 
//     {$push: {'movies': { movie_Id: movieIdFromApi, rating: rating }}},
//     { new: true }
//     )

//     .then(list => {
//       // res.render('list', { list } ); // <- Also works 
//       res.redirect(`/lists/${req.params.id}`);
//     })
//     .catch(err => {
//       next(err);
//     });

// })




/* Delete the List */

// router.post('/lists/:id/delete', (req, res, next) => {
//   List.findOneAndDelete({ _id: req.params.id })
//     .then(() => {
//       res.redirect(`/profile/${req.session.user._id}`)
//     })
//     .catch(err => {
//       next(err);
//     })
// });








// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------


/* ADD MOVIE TO FAVOURITES (from search page) */

//<a href="/movie/add?title={{title}}&movie_id={{movie_Id}}&movie_score={{score}}&poster={{posterUrl}}">Add movive</a>

router.get('/movie/add', (req, res, next) => {

  List.findOneAndUpdate(
    {onwer: req.session.user._id},
    {$push: {'movies': { 
                        movie_Id: req.query.movie_id,
                        movie_title: req.query.title,
                        posterUrl: req.query.poster,
                        ApiRating: movie_score
    }}},
    { new: true }
    )

    .then(list => {
      res.redirect('/profile/' + req.session.user._id);
    })
    .catch(err => {
      next(err);
    })

})












// /* Delete a movie from the List */

// router.post('/lists/:id/movie-delete/:movid', (req, res, next) => {
//   List.findByIdAndUpdate(
//     req.params.id, 
//     {$pull: {movies: {movie_Id: req.params.movid}}},
//     { new: true }
//     )
//     .then(list => {
//       res.redirect(`/lists/${req.params.id}`);
//     })
//     .catch(err => {
//       next(err);
//     });
// })









function searchMovie(array) {
  const result = []
  for (let movie in array) {
   result.push(
     {
       movie_Id:array[movie].id,
       title:array[movie].title,
       score:array[movie].vote_average,
       genre:array[movie].genre_ids,
       //posterUrl:posterLink + `${array[movie].poster_path}`
      })

    
  } 
};



module.exports = router;