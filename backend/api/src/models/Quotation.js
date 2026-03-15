import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
  {
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "CustomDesignRequest", required: true },
    designerId: { type: String, required: true },
    designerName: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryDays: { type: Number, required: true },
    note: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quotation", quotationSchema);