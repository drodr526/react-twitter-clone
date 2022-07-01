import mongoose from "mongoose";
import express, { response } from "express";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User"
import Post from "./models/Post"
import bodyParser from "body-parser";
import { UserInterface } from "./Interfaces/UserInterface"
import { DatabaseUserInterface } from "./Interfaces/UserInterface";
import { PostInterface } from "./Interfaces/PostInterface";
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./profile_pictures/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req: any, file: any, cb: any) => {
    //reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

dotenv.config();

const LocalStrategy = passportLocal.Strategy;

mongoose.connect(`${process.env.MONGODB_URI}`); //you need `${env_variable_name}` to have environmental variables in typescript

// Middleware
const app = express();
app.use("/profile_pictures", express.static("profile_pictures"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(
    session({
        secret: `${process.env.SECRET}`,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err: Error, foundUser: any) => {
            if (err) console.log(err);
            if (!foundUser) return done(null, false);
            bcrypt.compare(password, foundUser.password, (err, result) => {
                if (err) console.log(err);
                if (result === true) {
                    return done(null, foundUser);
                } else {
                    return done(null, false);
                }
            })
        })
    })
)
passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
})
passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err: Error, user: any) => {
        cb(err, user);
    })
})

// Routes
app.post('/api/register', async (req, res) => {
    const { name, email, username, password } = req?.body; //? means if there is no request, request == undefined. 

    //if there is no username or password, or entered values are not strings, return Improper Values
    if (!username || !password || !email || typeof username !== "string" || typeof password !== "string") {
        res.send("Improper values");
        return;
    }
    User.findOne({ username }, async (err: Error, doc: UserInterface) => {
        if (err) throw err;
        if (doc) res.send("User already exists")
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            username: username,
            password: hashedPassword
        })

        await newUser.save();
        res.send("Successfully registered");
    })
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.send("Successfully authenticated")
})

app.post('/api/logout', (req, res, next) => {
    //@ts-ignore
    req.logout((err) => {
        if (err) { return next(err); }
        //@ts-ignore
        req.session.destroy()
        res.send("Logged out");
    });

});

app.get("/api/session", (req, res) => {
    res.send(req.user);
})

app.route("/api/users/:username")
    .get((req, res) => {
        User.findOne({ username: req.params.username })
            .select("username name following followers")
            .exec((err: any, doc: any) => {
                res.send(doc)
            })
    })

app.route("/api/user-list")
    .post((req, res) => {
        User.find({ "_id": { $in: req.body.list } })
            .select("username name")
            .exec((err: any, users: any) => {
                res.send(users)
            })
    })

app.route("/api/users/:username/posts")
    .get((req, res) => {
        User.find({ username: req.params.username })
            .select("username name")
            .exec((err: any, user: any) => {
                Post.find({ author: user })
                    .sort({ date: -1 })
                    .populate({
                        path: "author",
                        select: "profilePicturePath name username"
                    })
                    //@ts-ignore
                    .exec((err: Error, postDocs: any) => {
                        res.send(postDocs)
                    })

            })
    })

app.route("/api/follow")
    .post((req: any, res) => {
        User.findOneAndUpdate({ username: req.user.username }, { $push: { following: req.body.followUser._id } })
            //@ts-ignore
            .exec((err: Error, sessionUser: any) => {
                User.findOneAndUpdate({ username: req.body.followUser.username }, { $push: { followers: req.user } })
                    //@ts-ignore
                    .exec((err: Error, userBeingFollowed: any) => {
                        res.send("Following...")
                    })
            })
    })

app.route("/api/unfollow")
    .post((req: any, res) => {
        User.findOneAndUpdate({ username: req.user.username }, { $pull: { following: req.body.unfollowUser._id } })
            //@ts-ignore
            .exec((err: Error, sessionUser: any) => {
                User.findOneAndUpdate({ username: req.body.unfollowUser.username }, { $pull: { followers: req.user._id } })
                    //@ts-ignore
                    .exec((err: Error, userBeingFollowed: any) => {
                        res.send("Unfollowing...")
                    })
            })
    })

app.route("/api/like")
    .post((req: any, res: any) => {

        const likePost = new mongoose.Types.ObjectId(req.body.likePost)
        User.findOneAndUpdate({ username: req.user.username }, { $push: { likes: likePost } })
            //@ts-ignore
            .exec((err: Error, sessionUser: any) => {
                Post.findByIdAndUpdate(likePost, { $push: { likedBy: req.user } })
                    //@ts-ignore
                    .exec((err: Error, post: any) => {
                        res.send("Liked")
                    })
            })
    })

app.route("/api/unlike")
    .post((req: any, res: any) => {
        const unlikePost = new mongoose.Types.ObjectId(req.body.unlikePost)
        User.findOneAndUpdate({ username: req.user.username }, { $pull: { likes: unlikePost } })
            //@ts-ignore
            .exec((err: Error, sessionUser: any) => {
                Post.findByIdAndUpdate(unlikePost, { $pull: { likedBy: req.user._id } })
                    //@ts-ignore
                    .exec((err: Error, post: any) => {
                        res.send("Unliked")
                    })
            })
    })

app.route("/api/reply")
    .post((req: any, res: any) => {
        const reply = new Post({
            author: req.user._id,
            content: req.body.content,
            replyingTo: req.body.postID,
            date: new Date()
        })

        reply.save((err: any, doc: any) => {
            Post.findByIdAndUpdate(req.body.postID, { $push: { replies: doc._id } })
                .exec((err: any, originalPost: any) => {
                    res.send("Updated post")
                })
        })


    })

app.route("/api/feed")
    .get((req: any, res: any) => {
        req.user.following.push(req.user)
        Post.find({ "author": { $in: req.user.following }, "replyingTo": { $exists: false } })
            .sort({ date: -1 })
            .populate({
                path: "author",
                select: "profilePicturePath name username"
            })
            .exec((err: any, posts: any) => {
                res.send(posts)
            })
    })

app.route("/api/posts/")
    .get((req, res) => {
        Post.find({ "replyingTo": { $exists: false } })
            .sort({ date: -1 })
            .populate({
                path: "author",
                select: "profilePicturePath name username"
            })
            .exec((err: any, posts: any) => {
                if (err) console.log(err)
                else res.send(posts)
            })

    })
    .post((req, res) => {

        const newPost = new Post({
            content: req.body.content,
            //@ts-ignore
            author: req.user._id,
            date: new Date()
        })

        newPost.save()
            .then(() => res.send("Saved successfully"))
    })

app.route("/api/posts/:id")
    .get((req, res) => {
        Post.findById(req.params.id)
            .populate({
                path: "author",
                select: "profilePicturePath name username"
            })
            .populate({
                path: "replies",
                select: "content date likedBy",
                populate: {
                    path: "author",
                    select: "profilePicturePath name username date"
                }
            })
            .exec((err: any, post: PostInterface) => {
                if (err) res.send(err)
                else res.send(post)
            })
    })
    .delete((req, res) => {
        Post.findByIdAndDelete(req.params.id, (err: Error, doc: PostInterface) => {
            if (err) res.send(err);
            else res.send("Deleted successfully")
        })
    })

app.route("/api/change-username")
.post((req: any, res : any)=>{
    User.findOne({username: req.body.username})
    .exec((err : any, doc : any) =>{
        if(doc){
            res.send("Username already exists.")
        }else{
            User.findOneAndUpdate({username: req.user.username}, {username: req.body.username})
            .exec((err:any, doc : any) =>{
                res.send("Updated username successfully")
            })
        }
    })
})

app.route('/api/change-name')
.post((req : any, res : any)=>{
    User.findOneAndUpdate({username: req.user.username}, {name: req.body.name})
    .exec(()=>{
        res.send("Updated name successfully")
    })
})

app.route('/api/change-password')
.post( async (req : any, res : any)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    User.findOneAndUpdate({username: req.user.username}, {password: hashedPassword})
    .exec(()=>{
        res.send("Updated password successfully")
    })
})

app.route("/api/change-pfp")
    .post(upload.single("profilePicture"), (req : any, res) => {
        User.findOneAndUpdate({username: req.user.username}, {profilePicturePath: req.file?.path})
        .exec(()=>{
            res.send("Updated successfully")
        })
    })

app.listen(4000, () => {
    console.log("Server started on port 4000");
})