const express = require("express")
const connectDB = require("./config/database");
const User = require("./models/user")
const app = express();   // creating application
app.use(express.json())  // converts json from api req to js object

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.send("new user added");
    }
    catch(err){
        res.status(400).send("error user not saved: " + err.message);
    }
    
})

// get a user details
app.get("/users", async (req, res) => {
    const userEmail = req.body.email;
    try{
        const users = await User.find({email : userEmail});
        if(users.length === 0) res.status(404).send("user not found");
        else {res.status(200).send(users);}
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
    
})

// get all users
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        if(users.length === 0) res.status(404).send("no users found");
        else {res.status(200).send(users);}
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
    
})
app.delete("/user", async(req, res) =>{
    try{
        const id = req.body.id;
        const user =  await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).send("User not found");
        }
        else{
            res.send("user deleted successfully");
        }
    }
    catch(err){
        res.send("something went wrong");
    }
})

app.patch("/user", async (req, res) => {
    const userId = req.body.id;
    const data = req.body;
    try{    
        const user = await User.findByIdAndUpdate(userId, data, {
            // returnDocument : "after",  // to return new updated user
            // runValidators : true,
        });
        res.send("user updated")
    }
    catch(err){
        res.status(400).send("update failed" + err.message);
    }
})

connectDB().then(()=> {
    const port = 3000;
    console.log("database connected");
    app.listen(port, ()=>{
        console.log(`server started, listening to port ${port}`)
    })
}).catch((err) =>{
    console.error("database connection error")
})
 