const { Schema, model } = require("mongoose");
const { listeners } = require("./User.model");


const userSchema = new Schema({
    title: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movies: [
        {
            movie_Id: String,
            movie_title: String,
            posterUrl: String,
            ApiRating: Number,
            
            //myRating: Number,
        }
    ]
});


const List = model("List", userSchema);

module.exports = List;

