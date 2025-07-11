const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  collegeImage: String,
  collegeName: String,
  collegeRating: Number,
  admissionDate: String,
  researchCount: Number,
  events: [String],
  sports: [String],
});

const College = mongoose.model("College", collegeSchema);
College.insertMany(colleges)
  .then(() => console.log("Data inserted successfully"))
  .catch((err) => console.error("Insert failed", err));

module.exports = College;
