const authService = require("../services/authServices");

const register = async (req, res) => {
  try {
    let createdUser = await authService.register(req.body);
    res.status(201).json({ message: "User created successfully", createdUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ message: "User logged in successfully", result });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
};
