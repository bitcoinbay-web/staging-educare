import mongoose from "mongoose";

const VerificationTokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

VerificationTokenSchema.index({ email: 1, token: 1 }, { unique: true }); // Ensures combination of email and token is unique

const VerificationToken =
  mongoose.models.VerificationToken ||
  mongoose.model("VerificationToken", VerificationTokenSchema);

export default VerificationToken;
