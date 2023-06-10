import mongoose, { models } from "mongoose";

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
