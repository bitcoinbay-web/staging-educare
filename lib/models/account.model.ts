import mongoose from "mongoose";
import { Schema } from "mongoose";
// import Accounts from "@/lib/models/user.model";

const AccountSchema = new Schema({
  //   _id: mongoose.Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Accounts =
  mongoose.models.Accounts || mongoose.model("Accounts", AccountSchema);

//  || mongoose.model("Accounts", AccountSchema);

export default Accounts;
