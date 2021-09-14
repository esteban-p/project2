const router = require("express").Router();

/* GET home page */

router.get('/', (req, res, next) => {
  res.render('index');
});





// // this route is now protected -> can only be accessed by a logged in user
// router.get('/profile', loginCheck(), (req, res, next) => {
//   // we retrieve the logged in user from the session
//   const loggedInUser = req.session.user;
//   // console.log(loggedInUser);
//   // and pass the user object into the view
//   res.render('profile', { user: loggedInUser });
// });









module.exports = router;
