const express = require("express")
const app = express();   // creating application


app.get("/user", (req, res, next) =>{
    console.log(req.params)
    console.log("1st done");
    // res.send("response 1");
    next();
},
(req,res,next) =>{
    console.log("2nd done");
    // res.send("response 2");
    next();
},
(req,res,next) =>{
    res.send("response 3");
})



app.get("/user/:userid/:name", (req, res) =>{
    console.log(req.params)
    res.send("user data fetched");
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`server started, listening to port ${port}`)
})
 