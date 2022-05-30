import mongoose from "mongoose";
import express from "express";
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

dotenv.config();

const LocalStrategy = passportLocal.Strategy;

mongoose.connect(`${process.env.MONGODB_URI}`); //you need `${env_variable_name}` to have environmental variables in typescript

// Middleware
const app = express();
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
        res.send("Logged out");
    });
});

app.get("/api/session", (req, res) => {
    res.send(req.user);
})

app.route("/api/posts/")
    .get((req, res) => {
        Post.find({}, (err: Error, posts: any) => {
            if (err) console.log(err)
            else res.send(posts)
        })
        .populate("user")
    })
    .post((req, res) => {
        const newPost = new Post({
            content: req.body.content,
            //@ts-ignore
            authorID: req.user._id,
            date: req.body.date
        })

        newPost.save()
            .then(() => res.send("Saved successfully"))
    })

app.route("/api/posts/:id")
    .get((req, res) => {
        Post.findById(req.params.id, (err: Error, doc: PostInterface) => {
            if (err) res.send(err)
            else res.send(doc)
        })
    })
    .delete((req, res) => {
        Post.findByIdAndDelete(req.params.id, (err: Error, doc: PostInterface) => {
            if (err) res.send(err);
            else res.send("Deleted successfully")
        })
    })

app.listen(4000, () => {
    console.log("Server started on port 4000");
})