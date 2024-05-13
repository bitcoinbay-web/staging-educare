// import { id } from "ethers";
import mongoose from "mongoose";
// const { Schema } from "mongoose";
// import { boolean } from "zod";

// import { unique } from "next/dist/build/utils";

// const UserRole = {
//   ADMIN: "Admin",
//   DOCTOR: "Doctor",
//   STUDENT: "Student",
// };

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    stdID: { type: String, required: true, unique: true },
    walletID: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["Admin", "Doctor", "Student"],
      default: "Student",
    },
    emailVerified: { type: Date, default: null },
    image: { type: String },
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Accounts" }],

    // onboarded: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);
let Users;
try {
  // Attempt to fetch existing model or create a new one
  Users = mongoose.models.Users || mongoose.model("Users", userSchema);
} catch (error) {
  console.error("Error while registering User model:", error);
}

export default Users;
