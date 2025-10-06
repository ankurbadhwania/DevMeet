const express = require("express")
const app = express();   // creating application
const {adminAuth, userAuth} = require("./middlewares/auth")

app.use("/admin", adminAuth);    // run for all type of req on admin 
// app.use("/user", userAuth);

app.get("/user/login", (req, res) => {
    console.log("login page open");
    res.send("you are on login page");
})

app.get("/admin", (req, res) => {
    console.log("admin data fetched");
    res.send("admin successfully logged in");
})

app.get("/admin/delete", (req, res) => {
    console.log("deleting");
    res.send("admin deleted logged in");
})


app.get("/user/data", userAuth, (req, res) => {
    console.log("user data fetched");
    res.send("user successfully logged in");
})


const port = 3000;
app.listen(port, ()=>{
    console.log(`server started, listening to port ${port}`)
})
 