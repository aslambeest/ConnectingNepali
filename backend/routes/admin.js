const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Admin: Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password -verificationToken'); // hide sensitive
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error('Admin Get Users Error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Admin: Basic stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const airportPickupCount = await User.countDocuments({ airportPickupEnrollment: true });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        verifiedUsers,
        airportPickupCount
      }
    });
  } catch (err) {
    console.error('Admin Stats Error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
