const Elective = require('../models/Elective');
const User = require('../models/user');

// @route   GET /api/electives/available
// @desc    Get all available electives for a student's year/sem
exports.getAvailableElectives = async (req, res) => {
  try {
    const student = await User.findById(req.user.userId);
    // You can filter by student year/semester if needed
    const electives = await Elective.find({ status: 'Open' });
    res.json(electives);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   POST /api/electives/enroll/:id
// @desc    Enroll in an elective
exports.enrollInElective = async (req, res) => {
  try {
    const studentId = req.user.userId;
    
    // 1. Check if student is already enrolled in ANY elective
    const alreadyEnrolled = await Elective.findOne({ enrolledStudents: studentId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'You are already enrolled in an elective: ' + alreadyEnrolled.subjectName });
    }

    // 2. Find the elective
    let elective = await Elective.findById(req.params.id);
    if (!elective) return res.status(404).json({ message: 'Elective not found' });

    // 3. Check capacity
    if (elective.enrolledStudents.length >= elective.capacity) {
      return res.status(400).json({ message: 'This elective is full' });
    }

    // 4. Enroll
    elective.enrolledStudents.push(studentId);
    
    // Auto-close if full
    if (elective.enrolledStudents.length >= elective.capacity) {
      elective.status = 'Closed';
    }

    await elective.save();
    res.json({ message: 'Successfully enrolled in ' + elective.subjectName, elective });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET /api/electives/my
// @desc    Get my current elective
exports.getMyElective = async (req, res) => {
  try {
    const elective = await Elective.findOne({ enrolledStudents: req.user.userId });
    res.json(elective);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
