const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URL = 'http://localhost:3000'; // Frontend base URL

// Email transport (Gmail)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate referral code
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// 🔐 REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password, referredBy } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    let referrer = null;

    if (referredBy) {
      referrer = await User.findOne({ referralCode: referredBy });
    }

    const rewardPoints = referrer ? 100 : 0;
    const referralCode = generateReferralCode();
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = new User({
      name,
      email,
      password: hashed,
      referralCode,
      referredBy: referrer ? referrer._id : null,
      rewardPoints,
      isVerified: false,
      verificationToken
    });

    await user.save();

    if (referrer) {
      referrer.rewardPoints += 100;
      await referrer.save();
    }

    const verifyUrl = `http://localhost:5000/api/auth/verify-email/${verificationToken}`;
    const mailOptions = {
      from: 'Connecting Nepali <noreply@connectingnepali.com>',
      to: email,
      subject: 'Verify your Email',
      html: `<p>Thanks for registering. Please <a href="${verifyUrl}">verify your email</a> to activate your account.</p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });

  } catch (e) {
    console.error('❌ Registration error:', e);
    res.status(500).json({ error: e.message });
  }
});

// ✅ VERIFY EMAIL (API Endpoint)
router.get('/verify-email/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.redirect(`${CLIENT_URL}/verify-email/invalid`);

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.redirect(`${CLIENT_URL}/verify-email/success`);
  } catch (err) {
    console.error('❌ Verification error:', err);
    res.redirect(`${CLIENT_URL}/verify-email/error`);
  }
});

module.exports = router;
