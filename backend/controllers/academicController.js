const { Attendance, Material, PYQ } = require('../models/academic');

// Attendance Controllers
const getAttendance = async (req, res) => {
    try {
        const { studentId, subject } = req.query;
        // In a real app, you would filter by studentId and subject
        const records = await Attendance.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error });
    }
};

const markAttendance = async (req, res) => {
    try {
        const { records } = req.body; // array of { studentId, status, subject, date }
        if (!records) return res.status(400).json({ message: 'No records provided' });

        const result = await Attendance.insertMany(records);
        res.status(201).json({ message: 'Attendance marked successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error marking attendance', error });
    }
};

// Material Controllers
const getMaterials = async (req, res) => {
    try {
        const materials = await Material.find();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching materials', error });
    }
};

const uploadMaterial = async (req, res) => {
    try {
        const { title, subject, unit, fileUrl } = req.body;
        const newMaterial = new Material({ title, subject, unit, fileUrl });
        await newMaterial.save();
        res.status(201).json({ message: 'Material uploaded successfully', data: newMaterial });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading material', error });
    }
};

// PYQ Controllers
const getPYQs = async (req, res) => {
    try {
        const { branch, year, subject } = req.query;
        // Build query based on provided filters
        const query = {};
        if (branch) query.branch = branch;
        if (year) query.year = year;
        if (subject) query.subject = subject;

        const pyqs = await PYQ.find(query);
        res.status(200).json(pyqs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching PYQs', error });
    }
};

const uploadPYQ = async (req, res) => {
    try {
        const { year, branch, subject, fileUrl } = req.body;
        const newPYQ = new PYQ({ year, branch, subject, fileUrl });
        await newPYQ.save();
        res.status(201).json({ message: 'PYQ uploaded successfully', data: newPYQ });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading PYQ', error });
    }
};

// Syllabus / Course Structure Controller
const getSyllabus = async (req, res) => {
    // Usually static or from a specific collection, spoofing for now
    res.status(200).json({ message: 'Syllabus endpoint' });
};

// Electives Controller
const getElectives = async (req, res) => {
    res.status(200).json({ message: 'Electives endpoint' });
};

module.exports = {
    getAttendance,
    markAttendance,
    getMaterials,
    uploadMaterial,
    getPYQs,
    uploadPYQ,
    getSyllabus,
    getElectives
};
