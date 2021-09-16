const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const List = require('../models/List.model');



/* Sign Up */

router.get('/signup', (req, res, next) => {
    res.render('signup');
  });
  
router.post('/signup', (req, res, next) => {
//console.log(req.body);
const { username, password } = req.body;
if (username.length === 0) {
    res.render('signup', { message: 'Username cannot be empty' });
    return;
}
if (password.length < 6) {
    res.render('signup', { message: 'Password should be at least 6 characters' });
    return;
}
User.findOne({ username: username })
.then(userFromDB => {
    if (userFromDB !== null) {
    res.render('signup', { message: 'Username is already taken' });
    } else {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    //console.log(hash);
    User.create({ username: username, password: hash })

    .then(createdUser => {
        const movies = [];
        console.log(createdUser);
        List.create({ title: 'Favourites', owner: createdUser._id, movies: movies})  //req.session.user._id
            .then(() => res.redirect('/login'))

    })
    .catch(err => {
        next(err);
    })
    }
})
});
  


/* Log In */

router.get('/login', (req, res, next) => {
    res.render('login');
  });
  
router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username: username })
        .then(userFromDB => {
            if (userFromDB === null) {
                res.render('login', { message: 'incorrect credentials' })
            }
            if (bcrypt.compareSync(password, userFromDB.password)) {
                req.session.user = userFromDB;
                //res.redirect('/profile');
                //console.log(req.session.user);
                res.redirect(`/profile/${req.session.user._id}`)
            } else {
                res.render('login', { message: 'incorrect credentials' })
            }
        })
});



/* Log Out */

router.get('/logout', (req, res, next) => {	
	req.session.destroy(err => {
		if (err) {
			next(err);
		} else {
			res.redirect('/');
		}
	})
});



module.exports = router;









