const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Generate referral code
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password, referralCode, referredBy } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);

    let referrer = null;
    if (referredBy) {
      referrer = await User.findOne({ referralCode: referredBy });
      console.log("REFERRER FOUND:", referrer);
    }

    const rewardPoints = referrer ? 100 : 0;

    const user = new User({
      name,
      email,
      password: hashed,
      referralCode: referralCode || generateReferralCode(),
      referredBy: referrer ? referrer._id : null,
      rewardPoints
    });

    console.log("NEW USER TO SAVE:", user);

    await user.save();

    if (referrer) {
      referrer.rewardPoints += 100;
      await referrer.save();
      console.log("UPDATED REFERRER POINTS:", referrer.rewardPoints);
    }

    res.status(201).json({
      message: 'Registered successfully',
      user: {
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        referredBy: user.referredBy,
        rewardPoints: user.rewardPoints
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// LOGIN with debug logging
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '7d' });

    console.log("LOGIN RESPONSE USER DATA:", {
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      referredBy: user.referredBy,
      rewardPoints: user.rewardPoints
    });

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        referredBy: user.referredBy,
        rewardPoints: user.rewardPoints ?? 0
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
