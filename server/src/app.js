const express = require("express")
const app = express();   // creating application

app.get("/user/:userid/:name", (req, res) =>{
    console.log(req.params)
    res.send("user data fetched");
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`server started, listening to port ${port}`)
})
 