const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Lấy tất cả món ăn
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({ inStock: true });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy món theo category
router.get('/category/:category', async (req, res) => {
  try {
    const items = await MenuItem.find({ 
      category: req.params.category,
      inStock: true 
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
