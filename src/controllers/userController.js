const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users/all
// @access  Public
const getUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const query = {};
        if (role) {
            query.role = role;
        }
        const users = await User.find(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a user
// @route   POST /api/users/create
// @access  Public
const createUser = async (req, res) => {
    const { name, email, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            role,
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
};
