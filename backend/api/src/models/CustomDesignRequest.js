import mongoose from "mongoose";

const customDesignRequestSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "general" },
    budget: { type: Number, default: 0 },
    deadline: { type: String, default: "" },
    referenceImageUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["open", "quoted", "in_progress", "completed", "cancelled"],
      default: "open",
    },
    assignedDesignerId: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("CustomDesignRequest", customDesignRequestSchema);