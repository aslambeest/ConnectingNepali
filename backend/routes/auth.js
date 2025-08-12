const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

// ===== Constants =====
const CLIENT_URL = process.env.CLIENT_URL || 'https://connectingnepali-frontend.onrender.com';
const TOKEN_TTL_MIN = 15;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// ===== Mailer (Gmail) =====
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// ===== Helpers =====
const generateReferralCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

// ================== REGISTER ==================
router.post('/register', async (req, res) => {
  const { name, email, password, referredBy, dob, visaStatus, licenseType } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const referrer = referredBy ? await User.findOne({ referralCode: referredBy }) : null;

    const user = new User({
      name,
      email,
      password: hashed,
      dob,
      visaStatus,
      licenseType,
      referralCode: generateReferralCode(),
      referredBy: referrer ? referrer._id : null,
      rewardPoints: referrer ? 100 : 0,
      isVerified: false,
      verificationToken,
      verificationTokenCreatedAt: Date.now()
    });

    await user.save();

    if (referrer) {
      referrer.rewardPoints += 100;
      await referrer.save();
    }

    const verifyUrl = `${CLIENT_URL}/verify-email/${verificationToken}`;
    await transporter.sendMail({
      from: 'Connecting Nepali <noreply@connectingnepali.com>',
      to: email,
      subject: 'Verify your Email',
      html: `<p>Click to verify your email: <a href="${verifyUrl}">${verifyUrl}</a></p>`
    });

    console.log('✅ Verification token:', verificationToken);
    res.status(200).json({ message: 'Verification email sent.' });

  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ================== LOGIN ==================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ error: 'User not found' });
    if (!user.isVerified) return res.status(400).json({ error: 'Email not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    const token = `mock-token-${user._id}`; // replace with JWT later

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        dob: user.dob || 'N/A',
        visaStatus: user.visaStatus || 'N/A',
        licenseType: user.licenseType || null,
        airportPickupEnrollment: user.airportPickupEnrollment || null,
        referralCode: user.referralCode || 'N/A',
        rewardPoints: user.rewardPoints || 0
      }
    });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ================== VERIFY EMAIL ==================
router.get('/verify-email/:token', async (req, res) => {
  try {
    const token = req.params.token;
    console.log('🔍 Verifying token:', token);

    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ status: 'invalid' });

    const TOKEN_EXPIRY = 1000 * 60 * 60 * 24; // 24 hours
    const isExpired = Date.now() - new Date(user.verificationTokenCreatedAt).getTime() > TOKEN_EXPIRY;

    if (isExpired) return res.status(400).json({ status: 'expired' });

    user.isVerified = true;
    user.verifiedAt = new Date();
    user.verificationToken = undefined;
    user.verificationTokenCreatedAt = undefined;
    await user.save();

    res.status(200).json({ status: 'success' });

  } catch (err) {
    console.error('❌ Email verification error:', err);
    res.status(500).json({ status: 'error' });
  }
});

// ================== FORGOT PASSWORD ==================
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const generic = { message: 'If that email exists, we’ve sent a reset link.' };

  try {
    if (!email) return res.json(generic);

    const user = await User.findOne({ email: email.toLowerCase() }).select('_id email');
    if (!user) return res.json(generic);

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = sha256(rawToken);
    user.resetPasswordTokenHash = tokenHash;
    user.resetPasswordExpires = new Date(Date.now() + TOKEN_TTL_MIN * 60 * 1000);
    await user.save();

    const resetUrl = `${CLIENT_URL}/reset-password?token=${rawToken}`;

    const html = `
      <div style="font-family:Arial,sans-serif">
        <p>Namaste,</p>
        <p>Reset your Connecting Nepali password by clicking the link below:</p>
        <p><a href="${resetUrl}" style="background:#2563eb;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Reset Password</a></p>
        <p>This link expires in ${TOKEN_TTL_MIN} minutes.</p>
        <hr/>
        <p>If you didn’t request this, you can ignore this email.</p>
      </div>
    `;

    await transporter.sendMail({
      from: 'Connecting Nepali <noreply@connectingnepali.com>',
      to: user.email,
      subject: 'Reset your Connecting Nepali password',
      html
    });

    return res.json(generic);
  } catch (err) {
    console.error('❌ Forgot-password error:', err);
    return res.json(generic);
  }
});

// ================== RESET PASSWORD ==================
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const errMsg = { error: 'Invalid or expired reset link.' };

  try {
    if (!token || !password) return res.status(400).json(errMsg);

    const tokenHash = sha256(token);

    const user = await User.findOne({
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpires: { $gt: new Date() }
    }).select('+password');

    if (!user) return res.status(400).json(errMsg);

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetPasswordTokenHash = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error('❌ Reset-password error:', err);
    return res.status(400).json(errMsg);
  }
});

// ================== GOOGLE LOGIN ==================
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Google token missing' });

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        isVerified: true,
        referralCode: generateReferralCode(),
        picture: payload.picture
      });
    }

    const sessionToken = `mock-token-${user._id}`; // Replace with JWT
    res.json({ message: 'Login successful', token: sessionToken, user });
  } catch (err) {
    console.error('❌ Google login error:', err);
    res.status(500).json({ error: 'Google login failed' });
  }
});

module.exports = router;
