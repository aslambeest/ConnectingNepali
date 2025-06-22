const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google users
  picture: { type: String },  // Google users

  // ✅ Referral system
  referralCode: { type: String, required: true }, // Auto-generated
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  rewardPoints: { type: Number, default: 0 },

  // ✅ Email verification
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
