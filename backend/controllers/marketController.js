const MarketItem = require('../models/MarketItem');

// Get all available items
exports.getAllItems = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = { status: 'Available' };

        if (category && category !== 'Select Category') {
            query.category = category;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const items = await MarketItem.find(query)
            .populate('seller', 'name email branch phone')
            .sort({ createdAt: -1 });

        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching items' });
    }
};

// Get single item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await MarketItem.findById(req.params.id)
            .populate('seller', 'name email branch phone year');
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching item details' });
    }
};

// Create new listing
exports.createItem = async (req, res) => {
    try {
        const { title, description, price, category, condition, images, location } = req.body;

        const newItem = new MarketItem({
            title,
            description,
            price,
            category,
            condition,
            images,
            location,
            seller: req.user.userId,
            status: 'Available'
        });

        const item = await newItem.save();
        res.status(201).json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error creating listing' });
    }
};

// Update listing (Owner only)
exports.updateItem = async (req, res) => {
    try {
        let item = await MarketItem.findById(req.params.id);
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check ownership
        if (item.seller.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'Not authorized to update this listing' });
        }

        item = await MarketItem.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating listing' });
    }
};

// Delete listing (Owner only)
exports.deleteItem = async (req, res) => {
    try {
        const item = await MarketItem.findById(req.params.id);
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check ownership
        if (item.seller.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'Not authorized to delete this listing' });
        }

        await MarketItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Listing removed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting listing' });
    }
};

// Get items listed by current user
exports.getMyItems = async (req, res) => {
    try {
        const items = await MarketItem.find({ seller: req.user.userId })
            .sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching your listings' });
    }
};
