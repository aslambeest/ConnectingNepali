const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, required: true }, // this user's code
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // who referred this user
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

