const express = require('express');
const router = require("express").Router();
const User = require('../models/User.model');
const List = require('../models/List.model');

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

router.get('/profile', loginCheck(), (req, res, next) => {
  //console.log('user: ', );
  const user = req.session.user;
  List.find( { owner: user._id } )
    .then(lists  => {
      //console.log('Tryig to console the list: ', lists);
      res.render('profile', { lists , user } );
    })
    .catch(err => {
      next(err);
    });
});



/* Create new list from Profile view */

router.post('/profile', (req, res, next) => {
  //console.log(req.body, req.session.user._id);
  const movies = [];
  List.create({ title: req.body.listName, owner: req.session.user._id, movies: movies})
    .then(() => {
      res.redirect('/profile');
    })
    .catch(err => {
      next(err);
    });
});





/* Show specific List of user */

router.get('/lists/:id', (req, res, next) => {
  List.findById(req.params.id)
    .then(list => {
      //console.log(req.params.id);
      res.render('list', { list } );
    })
    .catch(err => {
      next(err);
    });
})



/* Add movie to List, from list view */

router.post('/lists/:id', (req, res, next) => {

  const { movieIdFromApi, rating } = req.body;
  console.log(movieIdFromApi, rating)

  List.findByIdAndUpdate(
    req.params.id, 
    {$push: {'movies': { movie_Id: movieIdFromApi, rating: rating }}},
    { new: true }
    )

    .then(list => {
      // res.render('list', { list } ); // <- Also works 
      res.redirect(`/lists/${req.params.id}`);
    })
    .catch(err => {
      next(err);
    });

})



/* Delete the List */

// router.post('lists/:id/delete', (req, res, next) => {
//   List.findOneAndDelete({ _id: req.params.id })
//     .then(() => {
//       res.redirect('/profile');
//     })
//     .catch(err => {
//       next(err);
//     })
// });


router.post('lists/:id/delete', (req, res, next) => {
  List.findOneAndDelete({ _id: req.params.id })

})








module.exports = router;