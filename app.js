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


// session configuration

const session = require('express-session');
const MongoStore = require('connect-mongo');
//const DB_URL = process.env.MONGODB_URI;
const DB_URL = process.env.MONGO;

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        // for how long is the user logged in -> this would be one day 	
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: DB_URL
        })
    })
)
// end of session configuration



// setting the TMDB-api goes here:
const TMDBApi_key = process.env.API_Key;
 
// const TMDBApi = new TMDBApi({
//   API_Key: process.env.API_Key,
//   });


// default value for title local
const projectName = "project2-moviesList";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here

const index = require("./routes/index");
app.use("/", index);

const profileSearchResults = require('./routes/profileSearchResults');
app.use("/", profileSearchResults);

const homeSearchResults = require('./routes/homeSearchResults');
app.use('/', homeSearchResults);


const auth = require("./routes/auth");
app.use("/", auth);

const lists = require("./routes/lists");
app.use("/", lists);


//Use to render list in Profile
const listRender = require('./routes/listRender');
app.use('/', listRender);


// const movies = require("./routes/movies");
// app.use("/", movies);
// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
