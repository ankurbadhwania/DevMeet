const adminAuth = (req, res, next) => {
    const adminToken = "xyz";
    if(adminToken !== "xyz"){
        res.status(401).send("invalid user")
    }
    next();
}

const userAuth = (req, res, next) => {
    const userToken = "abc";
    if(userToken !== "abc"){
        res.status(401).send("invalid user")
    }
    next();
}
module.exports = {adminAuth, userAuth};