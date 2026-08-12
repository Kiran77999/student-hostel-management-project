const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'Late'], required: true },
    subject: { type: String, required: true }
}, { timestamps: true });

const materialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    unit: { type: Number },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const pyqSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    branch: { type: String, required: true },
    subject: { type: String, required: true },
    fileUrl: { type: String, required: true }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
const Material = mongoose.model('Material', materialSchema);
const PYQ = mongoose.model('PYQ', pyqSchema);

module.exports = {
    Attendance,
    Material,
    PYQ
};
