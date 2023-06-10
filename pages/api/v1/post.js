import connectDb from "../db/connect";
import { v2 as cloudinary } from "cloudinary";
import { Post } from "../db/models/post";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb", // Set desired value here
    },
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    await connectDb();
    const { name, prompt, image } = req.body;
    const imageUrl = await cloudinary.uploader.upload(image);
    const newPost = await Post.create({
      name,
      prompt,
      imageUrl: imageUrl?.url,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
}
