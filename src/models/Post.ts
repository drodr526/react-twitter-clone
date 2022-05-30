import mongoose from "mongoose";

const postSchema= new mongoose.Schema({
    content: String,
    authorID: String,
    date: Date,
})

export default mongoose.model("Post", postSchema)