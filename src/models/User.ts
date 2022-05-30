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
    }
})

export default mongoose.model("User", userSchema)