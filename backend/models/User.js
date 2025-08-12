const mongoose = require('mongoose');

// Safer way to avoid OverwriteModelError in dev:
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    picture: { type: String },

    // Profile
    dob: { type: Date },
    visaStatus: { type: String },

    // Referral
    referralCode: { type: String, required: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    rewardPoints: { type: Number, default: 0 },

    // Email verification
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenCreatedAt: { type: Date },
    verifiedAt: { type: Date },

    // Airport pickup
    licenseType: { type: String, default: null },
    airportPickupEnrollment: { type: Boolean, default: null },

    // 🔑 Password reset (required by your routes)
    resetPasswordTokenHash: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
