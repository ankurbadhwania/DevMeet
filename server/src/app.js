const express = require("express")
const app = express();   // creating application

app.use("/test",(req, res) => {  // order of routes matter
    res.send("hello test")
})
app.use("/hello",(req, res) => { 
    res.send("hello hello")
})
app.use("/", (req, res) => {
    res.send("hello from the server")
})

app.get("/user", (req, res) =>{
    console.log("user data fetched");
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`server started, listening to port ${port}`)
})
 