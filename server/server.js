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
    const { name, email, password, photo } = req.body; // add photo here

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      photo, // save photo here
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
    console.log("Fetched colleges from DB:", colleges); // Add this

    res.status(200).json(colleges);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({ message: "Failed to fetch colleges." });
  }
});
