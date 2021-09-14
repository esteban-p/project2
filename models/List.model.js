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
            rating: Number,
        }
    ]
});


const List = model("List", userSchema);

module.exports = List;