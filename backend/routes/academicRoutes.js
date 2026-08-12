const express = require('express');
const router = express.Router();
const {
    getAttendance,
    markAttendance,
    getMaterials,
    uploadMaterial,
    getPYQs,
    uploadPYQ,
    getSyllabus,
    getElectives
} = require('../controllers/academicController');

// Attendance routes
router.get('/attendance', getAttendance);
router.post('/attendance', markAttendance);

// Materials routes
router.get('/materials', getMaterials);
router.post('/materials', uploadMaterial);

// PYQ routes
router.get('/pyqs', getPYQs);
router.post('/pyqs', uploadPYQ);

// Syllabus & Electives
router.get('/syllabus', getSyllabus);
router.get('/electives', getElectives);

module.exports = router;
