import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  pageListUnchecked: { type: Array, required: true },
  pageListChecked: { type: Array, required: true },
});

export default mongoose.models.Collection ||  mongoose.model("Collection", CollectionSchema);
