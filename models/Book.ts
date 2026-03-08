import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  checkList: { type: Array, required: true },
});

export default mongoose.models.Book ||  mongoose.model("Book", BookSchema);
