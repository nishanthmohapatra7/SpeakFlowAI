import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  stats: {
    practiceSessions: { type: Number, default: 0 },
    totalSpeakingTime: { type: Number, default: 0 }, // in minutes
    averageScore: { type: Number, default: 0 },
    vocabularyScore: { type: Number, default: 0 },
    pronunciationScore: { type: Number, default: 0 }
  },
  history: [{
    date: { type: Date, default: Date.now },
    mode: String,
    score: Number,
    feedback: String,
    transcript: String
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
