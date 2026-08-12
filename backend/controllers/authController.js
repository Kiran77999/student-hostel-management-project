const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_123';

// Signup logic
exports.signup = async (req, res) => {
    try {
        const { name, email, rollno, phone, branch, year, password, role, adminCode } = req.body;

        // Check if user is trying to register as admin
        if (role === 'admin') {
            const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'SUPPLYSETU_ADMIN_2026';
            if (adminCode !== ADMIN_PASSCODE) {
                return res.status(401).json({ message: 'Invalid Admin Passcode' });
            }
        }

        // Check if user already exists
        let user = await User.findOne({ $or: [{ email }, { rollno }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email or roll number' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({
            name,
            email,
            rollno,
            phone,
            branch,
            year,
            password: hashedPassword,
            role: role || 'student'
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Login logic
exports.login = async (req, res) => {
    try {
        const { identifier, password } = req.body; // identifier can be email or rollno

        // Find user by email or rollno
        const user = await User.findOne({
            $or: [{ email: identifier }, { rollno: identifier }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                rollno: user.rollno,
                role: user.role,
                branch: user.branch,
                year: user.year
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};
