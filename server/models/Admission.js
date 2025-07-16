const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
  },
  candidateName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  address: String,
  dob: String,
  image: String,
});

const Admission = mongoose.model("Admission", admissionSchema);
module.exports = Admission;
