const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ UPDATE AIRPORT PICKUP ENROLLMENT
router.put('/airport-pickup', async (req, res) => {
  const { userId, enroll } = req.body;
  console.log('📥 Received request for airport-pickup');
  console.log('➡️ Payload:', req.body);

  // Input validation
  if (!userId || typeof enroll !== 'boolean') {
    console.log('❌ Invalid input');
    return res.status(400).json({ success: false, error: 'Invalid input' });
  }

  try {
    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { airportPickupEnrollment: enroll },
      { new: true }
    );

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    console.log('✅ Enrollment updated for user:', user._id);
    return res.status(200).json({
      success: true,
      message: 'Airport pickup enrollment updated successfully',
      airportPickupEnrollment: user.airportPickupEnrollment
    });
  } catch (err) {
    console.error('🔥 Server error during airport pickup update:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// 📊 Admin Dashboard User Stats
router.get('/admin-stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const unverifiedUsers = totalUsers - verifiedUsers;

    const airportPickupYes = await User.countDocuments({ airportPickupEnrollment: true });
    const airportPickupNo = await User.countDocuments({ airportPickupEnrollment: false });
    const airportPickupNull = await User.countDocuments({ airportPickupEnrollment: null });

    const licenseStats = await User.aggregate([
      { $match: { licenseType: { $ne: null } } },
      { $group: { _id: "$licenseType", count: { $sum: 1 } } }
    ]);

    const referredUsers = await User.countDocuments({ referredBy: { $ne: null } });

    res.json({
      totalUsers,
      verifiedUsers,
      unverifiedUsers,
      airportPickup: {
        yes: airportPickupYes,
        no: airportPickupNo,
        notSet: airportPickupNull
      },
      licenseStats,
      referredUsers
    });

  } catch (err) {
    console.error('❌ Admin stats error:', err);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

module.exports = router;
