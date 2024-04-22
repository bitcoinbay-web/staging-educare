// import { id } from "ethers";
import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";

const AccountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  stdID: { type: String, required: true },
  walletID: { type: String, required: true },
});

const Account = mongoose.model("Account", AccountSchema);

export default Account;
