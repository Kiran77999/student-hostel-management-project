const LostItem = require('../models/LostItem');

// @route   GET /api/lost
// @desc    Get all lost/found items
exports.getAllItems = async (req, res) => {
  try {
    const { type, category, search } = req.query;
    let query = {};

    if (type && type !== 'All') query.type = type;
    if (category && category !== 'Filter Category') query.category = category;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const items = await LostItem.find(query)
      .populate('reporter', 'name branch year')
      .sort({ createdAt: -1 });
    
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   POST /api/lost
// @desc    Create a new lost/found report
exports.createItem = async (req, res) => {
  try {
    const { type, title, description, category, location, date, time, image } = req.body;

    const newItem = new LostItem({
      type,
      title,
      description,
      category,
      location,
      date,
      time,
      image,
      reporter: req.user.userId
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT /api/lost/:id
// @desc    Update item status (e.g. mark as Recovered)
exports.updateItemStatus = async (req, res) => {
  try {
    let item = await LostItem.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    // Check if user is the reporter
    if (item.reporter.toString() !== req.user.userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    item = await LostItem.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   DELETE /api/lost/:id
// @desc    Delete a report
exports.deleteItem = async (req, res) => {
  try {
    let item = await LostItem.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    if (item.reporter.toString() !== req.user.userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await LostItem.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Report removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
