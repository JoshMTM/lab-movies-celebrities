const { Schema, model } = require("mongoose");
const MoviesSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [
    {
      type: Schema.Types.ObjectId,
      ref: "CeberitiesModel",
    },
  ],
});

const MoviesModel = model("Movies", MoviesSchema);

module.exports = MoviesModel;
