const User = require('../models/User');

// Create or update user
const createOrUpdateUser = async (req, res) => {
  try {
    const { name, email } = req.body; // Extract user data from the request body

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      // User already exists, update their information if needed
      user.name = name || user.name;
      await user.save();
      return res.status(200).json({ message: 'User updated', user });
    }

    // Create a new user
    user = new User({ name, email });
    await user.save();

    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createOrUpdateUser };
