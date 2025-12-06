const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/userModel');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const bootstrap = async () => {
    try {
        // Check if admin exists
        const adminExists = await User.findOne({ email: 'admin@example.com' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit();
        }

        await User.create({
            name: 'Super Admin',
            email: 'admin@example.com',
            password: 'password123', // Will be hashed by pre-save hook
            role: 'Manager',
        });

        console.log('Admin user created');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

bootstrap();
