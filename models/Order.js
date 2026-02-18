import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: Array,
    total: Number,
    customer: Object,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
