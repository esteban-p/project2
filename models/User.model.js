const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  photoUrl: String,
  favMovieQuote: String,
  genre1: [
    {
      movieId: String,
      myRating: Number
    }
  ],
  genre2: [
    {
      movieId: String,
      myRating: Number
    }
  ],
  genre3: [
    {
      movieId: String,
      myRating: Number
    }
  ],
  genre4: [
    {
      movieId: String,
      myRating: Number
    }
  ],
  genre5: [
    {
      movieId: String,
      myRating: Number
    }
  ],
  genre6: [
    {
      movieId: String,
      myRating: Number
    }
  ]

});

const User = model("User", userSchema);

module.exports = User;
