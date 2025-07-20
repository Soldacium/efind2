const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("@models/user.model");
const router = express.Router();

const register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   POST /api/auth/login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Nieprawidłowe dane logowania" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Nieprawidłowe dane logowania" });
    }
    const payload = { userId: user._id, roles: user.roles };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Return token and basic user info so client knows the id
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        roles: user.roles,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

module.exports = router;

module.exports = {
  register: register,
  login: login,
};
