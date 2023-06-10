import mongoose from "mongoose";

export default async function connectDb() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("CONNECTED TO DATABASE"))
    .catch(() => console.log("ERROR - NOT CONNECTED TO DATABASE"));
}
