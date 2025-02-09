const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const guestLogin = async (req, res) => {
  try {
    const guestUser = new User({
      name: `Guest_${Math.random().toString(36).substr(2, 9)}`,
      email: `guest_${Date.now()}@temp.com`,
      password: await bcrypt.hash(Math.random().toString(), 10),
      isGuest: true
    });
    await guestUser.save();

    const token = jwt.sign(
      { id: guestUser._id, isGuest: true },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token, user: { id: guestUser._id, name: guestUser.name, isGuest: true } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, guestLogin };