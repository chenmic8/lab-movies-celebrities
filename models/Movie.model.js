// Require Mongoose
const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId }, { ref: "Celebrity" }],
  },
  { timestamps: true }
);

// Compile model from schema
module.exports = model("Movie", movieSchema);
