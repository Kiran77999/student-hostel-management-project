const User = require('../models/user');
const Elective = require('../models/Elective');

// @route   GET /api/admin/students
// @desc    Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ name: 1 });
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET /api/admin/electives
// @desc    Get all electives
exports.getAllElectives = async (req, res) => {
  try {
    const electives = await Elective.find().sort({ subjectName: 1 });
    res.json(electives);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   POST /api/admin/electives
// @desc    Create a new elective
exports.createElective = async (req, res) => {
  try {
    const { subjectName, subjectCode, description, department, capacity, semester, year } = req.body;
    
    let elective = await Elective.findOne({ subjectCode });
    if (elective) {
      return res.status(400).json({ message: 'Elective with this code already exists' });
    }

    elective = new Elective({
      subjectName,
      subjectCode,
      description,
      department,
      capacity,
      semester,
      year
    });

    await elective.save();
    res.json(elective);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT /api/admin/electives/:id
// @desc    Update elective
exports.updateElective = async (req, res) => {
  try {
    const elective = await Elective.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(elective);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   DELETE /api/admin/electives/:id
// @desc    Delete elective
exports.deleteElective = async (req, res) => {
  try {
    await Elective.findByIdAndDelete(req.params.id);
    res.json({ message: 'Elective deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
