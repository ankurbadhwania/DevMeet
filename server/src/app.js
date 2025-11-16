const express = require("express")
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express();   // creating application
const http = require("http");

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter= require('./routes/request')
const userRouter= require("./routes/user")
const chatRouter = require("./routes/chat");
const initializeSocket = require("./utils/socket");

app.use(cors( {
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(express.json())  // converts json from api req to js object
app.use(cookieParser())  // middleware to read cookies

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB().then(()=> {
    const port = 3000;
    console.log("database connected");
    server.listen(port, () => {
  console.log(`server started, listening to port ${port}`);
});

}).catch((err) =>{
    console.error("database connection error")
})
 