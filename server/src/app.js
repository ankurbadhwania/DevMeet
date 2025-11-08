const express = require("express")
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser")
const app = express();   // creating application
app.use(express.json())  // converts json from api req to js object
app.use(cookieParser())    // middleware to read cookies

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter= require('./routes/request')
const userRouter= require("./routes/user")

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/", userRouter);

// get a user details
// app.get("/users", async (req, res) => {
//     const userEmail = req.body.email;
//     try{
//         const users = await User.find({email : userEmail});
//         if(users.length === 0) res.status(404).send("user not found");
//         else {res.status(200).send(users);}
//     }
//     catch(err){
//         res.status(400).send("something went wrong");
//     }
    
// })

// // get all users
// app.get("/feed", async (req, res) => {
//     try{
//         const users = await User.find({});
//         if(users.length === 0) res.status(404).send("no users found");
//         else {res.status(200).send(users);}
//     }
//     catch(err){
//         res.status(400).send("something went wrong");
//     }
    
// })
// app.delete("/user", async(req, res) =>{
//     try{
//         const id = req.body.id;
//         const user =  await User.findByIdAndDelete(id);
//         if (!user) {
//             res.status(404).send("User not found");
//         }
//         else{
//             res.send("user deleted successfully");
//         }
//     }
//     catch(err){
//         res.send("something went wrong");
//     }
// })

// app.patch("/user/:id", async (req, res) => {
//     const userId = req.params?.id;
//     const data = req.body;
//     try{    
//         const Allowed_Updates = ['gender', 'skills', 'about', 'photoUrl', 'age'];
//         const isUpdateAllowed = Object.keys(data).every((k) => Allowed_Updates.includes(k));

//         if(!isUpdateAllowed) {
//             throw new Error("cant be updated")
//         }
//         if(data?.skills.length > 10){
//             throw new Error("skills can not be more than 10")
//         }
//         const user = await User.findByIdAndUpdate(userId, data, {
//             // returnDocument : "after",  // to return new updated user
//             // runValidators : true,
//         });
//         res.send("user updated")
//     }
//     catch(err){
//         res.status(400).send("update failed " + err.message);
//     }
// })

connectDB().then(()=> {
    const port = 3000;
    console.log("database connected");
    app.listen(port, ()=>{
        console.log(`server started, listening to port ${port}`)
    })
}).catch((err) =>{
    console.error("database connection error")
})
 