const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users/all
// @access  Public
const getUsers = async (req, res) => {
    try {
        const { role, page = 1, limit = 10, search = '', sortBy = 'createdAt', order = 'desc' } = req.query;

        // Build query object
        const query = {};
        if (role) {
            query.role = role;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        // Pagination
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        // Sorting
        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;

        const total = await User.countDocuments(query);
        const users = await User.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum);

        res.status(200).json({
            users,
            total,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
        });
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

// @desc    Update user
// @route   PUT /api/users/update
// @access  Manager
const updateUser = async (req, res) => {
    const { userId } = req.query;
    const { name, email, role, password } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        if (password) {
            user.password = password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
};
