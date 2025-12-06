const mongoose = require('mongoose');
const User = require('../models/userModel');
const Project = require('../models/projectModel');
const Ticket = require('../models/ticketModel');
require('dotenv').config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Clear existing data
        await User.deleteMany({});
        await Project.deleteMany({});
        await Ticket.deleteMany({});
        console.log('✅ Cleared existing data');

        // Create Users
        console.log('\n📝 Creating Users...');

        const manager1 = await User.create({
            name: 'John Manager',
            email: 'manager@minijira.com',
            password: 'manager123',
            role: 'Manager',
        });

        const manager2 = await User.create({
            name: 'Sarah Smith',
            email: 'sarah.manager@minijira.com',
            password: 'manager123',
            role: 'Manager',
        });

        const dev1 = await User.create({
            name: 'Alice Developer',
            email: 'alice@minijira.com',
            password: 'dev123',
            role: 'Developer',
        });

        const dev2 = await User.create({
            name: 'Bob Johnson',
            email: 'bob@minijira.com',
            password: 'dev123',
            role: 'Developer',
        });

        const dev3 = await User.create({
            name: 'Charlie Brown',
            email: 'charlie@minijira.com',
            password: 'dev123',
            role: 'Developer',
        });

        const dev4 = await User.create({
            name: 'Diana Prince',
            email: 'diana@minijira.com',
            password: 'dev123',
            role: 'Developer',
        });

        console.log('✅ Created 6 users (2 Managers, 4 Developers)');

        // Create Projects
        console.log('\n📁 Creating Projects...');

        const project1 = await Project.create({
            name: 'E-Commerce Platform',
            managerId: manager1._id,
            description: 'Building a modern e-commerce platform with React and Node.js',
            status: 'Active',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2025-06-30'),
        });

        const project2 = await Project.create({
            name: 'Mobile Banking App',
            managerId: manager1._id,
            description: 'Secure mobile banking application for iOS and Android',
            status: 'Active',
            startDate: new Date('2024-03-15'),
            endDate: new Date('2025-03-15'),
        });

        const project3 = await Project.create({
            name: 'CRM System',
            managerId: manager2._id,
            description: 'Customer Relationship Management system for enterprise clients',
            status: 'Active',
            startDate: new Date('2024-02-01'),
            endDate: new Date('2025-08-01'),
        });

        const project4 = await Project.create({
            name: 'Analytics Dashboard',
            managerId: manager2._id,
            description: 'Real-time analytics and reporting dashboard',
            status: 'On Hold',
            startDate: new Date('2024-04-01'),
        });

        const project5 = await Project.create({
            name: 'Legacy Migration',
            managerId: manager1._id,
            description: 'Migrating legacy systems to cloud infrastructure',
            status: 'Completed',
            startDate: new Date('2023-06-01'),
            endDate: new Date('2024-11-30'),
        });

        console.log('✅ Created 5 projects');

        // Create Tickets
        console.log('\n🎫 Creating Tickets...');

        // E-Commerce Platform Tickets
        await Ticket.create({
            projectId: project1._id,
            title: 'Implement User Authentication',
            description: 'Set up JWT-based authentication with login and registration',
            assignees: [dev1._id],
            status: 'Resolved',
            priority: 'High',
            spendTime: '8h',
            duration: '2 days',
            remark: 'Completed with unit tests',
        });

        await Ticket.create({
            projectId: project1._id,
            title: 'Design Product Catalog UI',
            description: 'Create responsive product listing and detail pages',
            assignees: [dev2._id, dev3._id],
            status: 'In Progress',
            priority: 'High',
            spendTime: '12h',
            duration: '3 days',
        });

        await Ticket.create({
            projectId: project1._id,
            title: 'Shopping Cart Functionality',
            description: 'Implement add to cart, update quantity, and checkout flow',
            assignees: [dev1._id],
            status: 'In Progress',
            priority: 'Critical',
            spendTime: '6h',
            duration: '4 days',
        });

        await Ticket.create({
            projectId: project1._id,
            title: 'Payment Gateway Integration',
            description: 'Integrate Stripe payment gateway for secure transactions',
            assignees: [],
            status: 'Open',
            priority: 'Critical',
            duration: '5 days',
        });

        await Ticket.create({
            projectId: project1._id,
            title: 'Order History Page',
            description: 'Display user order history with filtering and sorting',
            assignees: [dev4._id],
            status: 'Open',
            priority: 'Medium',
            duration: '2 days',
        });

        // Mobile Banking App Tickets
        await Ticket.create({
            projectId: project2._id,
            title: 'Biometric Authentication',
            description: 'Implement fingerprint and face ID authentication',
            assignees: [dev3._id],
            status: 'In Progress',
            priority: 'Critical',
            spendTime: '10h',
            duration: '5 days',
        });

        await Ticket.create({
            projectId: project2._id,
            title: 'Account Balance Dashboard',
            description: 'Create dashboard showing account balances and recent transactions',
            assignees: [dev2._id],
            status: 'Resolved',
            priority: 'High',
            spendTime: '15h',
            duration: '3 days',
            remark: 'Approved by QA team',
        });

        await Ticket.create({
            projectId: project2._id,
            title: 'Fund Transfer Feature',
            description: 'Enable users to transfer funds between accounts',
            assignees: [dev1._id, dev4._id],
            status: 'In Progress',
            priority: 'High',
            spendTime: '8h',
            duration: '4 days',
        });

        await Ticket.create({
            projectId: project2._id,
            title: 'Transaction History Export',
            description: 'Allow users to export transaction history as PDF/CSV',
            assignees: [],
            status: 'Open',
            priority: 'Low',
            duration: '2 days',
        });

        // CRM System Tickets
        await Ticket.create({
            projectId: project3._id,
            title: 'Contact Management Module',
            description: 'Build CRUD operations for customer contacts',
            assignees: [dev4._id],
            status: 'Resolved',
            priority: 'High',
            spendTime: '20h',
            duration: '5 days',
            remark: 'All features working as expected',
        });

        await Ticket.create({
            projectId: project3._id,
            title: 'Email Campaign Builder',
            description: 'Create drag-and-drop email campaign builder',
            assignees: [dev2._id, dev3._id],
            status: 'In Progress',
            priority: 'Medium',
            spendTime: '16h',
            duration: '7 days',
        });

        await Ticket.create({
            projectId: project3._id,
            title: 'Sales Pipeline Visualization',
            description: 'Implement Kanban-style sales pipeline board',
            assignees: [dev1._id],
            status: 'Open',
            priority: 'High',
            duration: '4 days',
        });

        await Ticket.create({
            projectId: project3._id,
            title: 'Customer Analytics Reports',
            description: 'Generate analytics reports for customer engagement',
            assignees: [],
            status: 'Open',
            priority: 'Medium',
            duration: '3 days',
        });

        // Analytics Dashboard Tickets
        await Ticket.create({
            projectId: project4._id,
            title: 'Real-time Data Streaming',
            description: 'Set up WebSocket connection for real-time data updates',
            assignees: [dev3._id],
            status: 'Open',
            priority: 'High',
            duration: '6 days',
        });

        await Ticket.create({
            projectId: project4._id,
            title: 'Chart Library Integration',
            description: 'Integrate Chart.js for data visualization',
            assignees: [dev4._id],
            status: 'In Progress',
            priority: 'Medium',
            spendTime: '5h',
            duration: '2 days',
        });

        await Ticket.create({
            projectId: project4._id,
            title: 'Custom Report Builder',
            description: 'Allow users to create custom reports with filters',
            assignees: [],
            status: 'Open',
            priority: 'Low',
            duration: '5 days',
        });

        // Legacy Migration Tickets
        await Ticket.create({
            projectId: project5._id,
            title: 'Database Migration Script',
            description: 'Create scripts to migrate data from Oracle to PostgreSQL',
            assignees: [dev1._id],
            status: 'Closed',
            priority: 'Critical',
            spendTime: '40h',
            duration: '10 days',
            remark: 'Migration completed successfully',
        });

        await Ticket.create({
            projectId: project5._id,
            title: 'API Modernization',
            description: 'Refactor legacy SOAP APIs to RESTful APIs',
            assignees: [dev2._id],
            status: 'Closed',
            priority: 'High',
            spendTime: '35h',
            duration: '8 days',
            remark: 'All endpoints tested and documented',
        });

        await Ticket.create({
            projectId: project5._id,
            title: 'Cloud Infrastructure Setup',
            description: 'Set up AWS infrastructure for migrated applications',
            assignees: [dev3._id, dev4._id],
            status: 'Resolved',
            priority: 'Critical',
            spendTime: '50h',
            duration: '12 days',
            remark: 'Infrastructure ready for production',
        });

        console.log('✅ Created 20 tickets across all projects');

        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('🎉 DATABASE SEEDED SUCCESSFULLY!');
        console.log('='.repeat(60));

        console.log('\n👥 USERS:');
        console.log('─'.repeat(60));
        console.log('MANAGERS:');
        console.log('  1. Email: manager@minijira.com');
        console.log('     Password: manager123');
        console.log('     Name: John Manager');
        console.log('');
        console.log('  2. Email: sarah.manager@minijira.com');
        console.log('     Password: manager123');
        console.log('     Name: Sarah Smith');
        console.log('');
        console.log('DEVELOPERS:');
        console.log('  1. Email: alice@minijira.com');
        console.log('     Password: dev123');
        console.log('     Name: Alice Developer');
        console.log('');
        console.log('  2. Email: bob@minijira.com');
        console.log('     Password: dev123');
        console.log('     Name: Bob Johnson');
        console.log('');
        console.log('  3. Email: charlie@minijira.com');
        console.log('     Password: dev123');
        console.log('     Name: Charlie Brown');
        console.log('');
        console.log('  4. Email: diana@minijira.com');
        console.log('     Password: dev123');
        console.log('     Name: Diana Prince');

        console.log('\n📁 PROJECTS:');
        console.log('─'.repeat(60));
        console.log('  1. E-Commerce Platform (Active) - 5 tickets');
        console.log('  2. Mobile Banking App (Active) - 4 tickets');
        console.log('  3. CRM System (Active) - 4 tickets');
        console.log('  4. Analytics Dashboard (On Hold) - 3 tickets');
        console.log('  5. Legacy Migration (Completed) - 3 tickets');

        console.log('\n📊 TICKET STATISTICS:');
        console.log('─'.repeat(60));
        console.log('  Total Tickets: 20');
        console.log('  Open: 8');
        console.log('  In Progress: 7');
        console.log('  Resolved: 3');
        console.log('  Closed: 2');
        console.log('');
        console.log('  Priority Breakdown:');
        console.log('    Critical: 5');
        console.log('    High: 8');
        console.log('    Medium: 5');
        console.log('    Low: 2');

        console.log('\n' + '='.repeat(60));
        console.log('You can now login and test the UI with realistic data!');
        console.log('='.repeat(60) + '\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error.message);
        process.exit(1);
    }
};

seedData();
