const mongoose = require('mongoose');
const User = require('../models/userModel');
require('dotenv').config();

const seedManager = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Check if manager already exists
        const existingManager = await User.findOne({ email: 'manager@minijira.com' });

        if (existingManager) {
            console.log('Manager already exists!');
            console.log('Email:', existingManager.email);
            console.log('Name:', existingManager.name);
            console.log('Role:', existingManager.role);
            process.exit(0);
        }

        // Create manager user
        const manager = await User.create({
            name: 'Manager',
            email: 'manager@minijira.com',
            password: 'manager123', // This will be hashed automatically by the pre-save hook
            role: 'Manager',
        });

        console.log('✅ Manager created successfully!');
        console.log('-----------------------------------');
        console.log('Email:', manager.email);
        console.log('Password: manager123');
        console.log('Name:', manager.name);
        console.log('Role:', manager.role);
        console.log('-----------------------------------');
        console.log('You can now login with these credentials');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding manager:', error.message);
        process.exit(1);
    }
};

seedManager();
