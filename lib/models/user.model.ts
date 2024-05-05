// import { id } from "ethers";
import mongoose from "mongoose";
// const { Schema } from "mongoose";
// import { boolean } from "zod";
// import { unique } from "next/dist/build/utils";

const UserRole = {
  ADMIN: "Admin",
  DOCTOR: "Doctor",
  STUDENT: "Student",
};

const AccountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    stdID: { type: String, required: true, unique: true },
    walletID: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: "Student",
    },
    // accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    // onboarded: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);
let Accounts;
try {
  // Attempt to fetch existing model or create a new one
  Accounts =
    mongoose.models.Accounts || mongoose.model("Accounts", AccountSchema);
} catch (error) {
  console.error("Error while registering Account model:", error);
}

export default Accounts;
