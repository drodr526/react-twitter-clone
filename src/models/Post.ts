import mongoose from "mongoose";

const postSchema= new mongoose.Schema({
    content: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    date: Date,
})

export default mongoose.model("Post", postSchema)