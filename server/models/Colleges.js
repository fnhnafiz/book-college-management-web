// const mongoose = require("mongoose");

// const College = mongoose.model(
//   "Colleges",
//   new mongoose.Schema({
//     collegeImage: String,
//     collegeName: String,
//     collegeRating: Number,
//     admissionDate: String,
//     researchCount: Number,
//     events: [String],
//     sports: [String],
//   })
// );

// module.exports = College;

const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
  collegeImage: String,
  collegeName: String,
  collegeRating: Number,
  admissionDate: String,
  researchCount: Number,
  events: [String],
  sports: [String],
});

const College = mongoose.model("Colleges", CollegeSchema, "Colleges");

module.exports = College;
