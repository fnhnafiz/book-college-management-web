const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const connectDB = require("./db");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

const User = require("./models/User");
const College = require("./models/Colleges");
const Admission = require("./models/Admission");
const Review = require("./models/Reviews");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("AdmitWise server is running");
    app.listen(PORT, () =>
      console.log(`AdmitWise Server Runing on: http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB Err", err));

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body; // add photo here

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all colleges
app.get("/colleges", async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch colleges." });
  }
});
// show all college details data
app.get("/colleges/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const college = await College.findById(id);
    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }
    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});
// Addmision to college students
app.post("/admissions", async (req, res) => {
  try {
    const {
      collegeName,
      candidateName,
      subject,
      email,
      phone,
      address,
      dob,
      image,
    } = req.body;

    // Prevent duplicate admission (email + collegeName)
    const alreadyExists = await Admission.findOne({
      collegeName,
      email,
    });

    if (alreadyExists) {
      return res
        .status(400)
        .json({ error: "You have already applied to this college." });
    }

    const newAdmission = new Admission({
      collegeName,
      candidateName,
      subject,
      email,
      phone,
      address,
      dob,
      image,
    });

    await newAdmission.save();
    res.status(201).json({ message: "Admission submitted successfully" });
  } catch (err) {
    console.error("Admission Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all addmission college
app.get("/my-addmissions", async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return res.status(400).json({ error: "Email is required" });
    }
    const admissions = await Admission.find({ email: userEmail });
    res.status(200).json(admissions);
  } catch (error) {
    console.error("Failed to fetch admissions:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Students colleges Reviews;
app.post("/reviews", async (req, res) => {
  try {
    const existingReview = await Review.findOne({ collegeId, userEmail });
    if (existingReview) {
      return res
        .status(400)
        .json({ error: "You already submitted a review for this college." });
    }
    const { collegeId, userEmail, reviewText, rating } = req.body;

    if (!collegeId || !userEmail || !reviewText || !rating) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReview = new Review({
      collegeId,
      userEmail,
      reviewText,
      rating,
    });
    await newReview.save();
    res.status(200).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Review submitted error:", error);
    res.status(500).json({ error: "server error" });
  }
});

// show all reviews
app.get("/all-reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching for Reviews");
    res.status(500).json({ error: "Server error" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send(" AdmitWise Server is running");
});
