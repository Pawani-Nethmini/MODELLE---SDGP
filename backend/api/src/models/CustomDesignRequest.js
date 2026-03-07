import mongoose from "mongoose";

const designerProfileSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    username: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    bio: { type: String, default: "" },
    skills: [{ type: String }],
    software: [{ type: String }],
    portfolioFile: { type: String, default: null },
    hourlyRate: { type: Number, default: 15 },
    rating: { type: Number, default: 4.5 },
    completedProjects: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("DesignerProfile", designerProfileSchema);