require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/user');
const { Attendance, Material, PYQ } = require('./models/academic');

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_mgmt');
        console.log('Connected to MongoDB for seeding...');

        // Clear existing test data
        await User.deleteMany({});
        await Material.deleteMany({});
        await PYQ.deleteMany({});
        await Attendance.deleteMany({});

        console.log('Creating users...');
        const hashedPassword = await bcrypt.hash('password123', 10);
        const tempPassword = await bcrypt.hash('temp', 10);

        const students = await User.insertMany([
            { 
                name: 'Niraj pandey', 
                email: 'niraj@example.com', 
                rollno: '22011p0533', 
                phone: '9876543210',
                role: 'student', 
                branch: 'cse', 
                year: 1, 
                password: tempPassword 
            },
            { 
                name: 'John Doe', 
                email: 'john@test.com', 
                rollno: '22011p0001', 
                phone: '1234567890',
                role: 'student', 
                branch: 'Computer Science', 
                year: 2, 
                password: hashedPassword 
            },
            { 
                name: 'Jane Smith', 
                email: 'jane@test.com', 
                rollno: '22011p0002', 
                phone: '2345678901',
                role: 'student', 
                branch: 'Information Tech', 
                year: 3, 
                password: hashedPassword 
            }
        ]);

        console.log('Creating subject materials...');
        await Material.insertMany([
            { title: 'Data Structures Notes', subject: 'Data Structures', unit: 1, fileUrl: 'https://example.com/ds_notes.pdf', uploadedBy: students[0]._id },
            { title: 'Operating Systems Slides', subject: 'Operating Systems', unit: 2, fileUrl: 'https://example.com/os_slides.pdf', uploadedBy: students[1]._id }
        ]);

        console.log('Creating PYQs...');
        await PYQ.insertMany([
            { year: 2023, branch: 'Computer Science', subject: 'Data Structures', fileUrl: 'https://example.com/pyq2023.pdf' },
            { year: 2022, branch: 'Computer Science', subject: 'Data Structures', fileUrl: 'https://example.com/pyq2022.pdf' }
        ]);

        console.log('Marking some attendance...');
        await Attendance.insertMany([
            { studentId: students[0]._id, date: new Date(), status: 'Present', subject: 'Data Structures' },
            { studentId: students[1]._id, date: new Date(), status: 'Absent', subject: 'Operating Systems' },
            { studentId: students[2]._id, date: new Date(), status: 'Late', subject: 'Electronics Basics' }
        ]);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
