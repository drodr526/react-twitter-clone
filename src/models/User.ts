import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    password: String,
    name: String,
    email: {
        type: String, 
        unique: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    likes:  [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    profilePicturePath: {
        type: String,
        default: "profile_pictures/egg.png"
    }
})

export default mongoose.model("User", userSchema)