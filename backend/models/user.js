const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rollno: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['student', 'faculty', 'admin'], default: 'student' },
    branch: { type: String, required: true },
    year: { type: Number, required: true, min: 1, max: 4 },
    password: { type: String, required: true } 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
