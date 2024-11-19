const db = require('../config/db');

// CREATE a new user
exports.createUser = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
      [name, email, age]
    );
    res.status(201).json({ id: result.insertId, name, email, age });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ all users
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.execute("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const [user] = await db.execute("SELECT * FROM users WHERE id = ?", [req.params.id]);
    if (user.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a user by ID
exports.updateUser = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const [result] = await db.execute(
      "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
      [name, email, age, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
