import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  books: { type: Array, required: true },
  token: { type: String, required: true, unique: true },
  salt: { type: String, required: true},
  hash: { type: String, required: true},
});

export default mongoose.models.User ||  mongoose.model("User", UserSchema);
