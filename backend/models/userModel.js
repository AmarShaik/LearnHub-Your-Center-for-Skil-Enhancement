import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  type: {
    type: String,
    enum: ["student", "teacher"],
    required: [true, "Please specify user type"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const User = mongoose.model("User", userSchema);
