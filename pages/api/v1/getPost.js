import connectDb from "../db/connect";
import { Post } from "../db/models/post";

export default async function handler(req, res) {
  try {
    await connectDb();
    const allPosts = await Post.find({});
    res.status(200).send(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
}
