import mongoose from "mongoose";

import { UserProfileAttributes } from "../interfaces/model.interface";
import Helper from "../helpers";

export const UserProfileSchema = new mongoose.Schema<UserProfileAttributes>({
  username: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    min: 6,
  },
});

UserProfileSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = Helper.hash(this.password, 10);

  return next();
});

export default mongoose.model<UserProfileAttributes>("User", UserProfileSchema);
