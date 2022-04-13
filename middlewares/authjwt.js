const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const User = require("../models/user.model");
const constants = require("../utils/constants");


verifyToken = (req, res, next) => {
    console.log("AAAAAA-11")
    console.log(req.body);
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    console.log("AAAAAA-2",token)
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        console.log("AAAAAA-3")
        next();
    });
};

isAdmin = async (req, res, next) => {
    console.log("AAAAAA-4")
    
    const user = await User.findOne({
        userId: req.userId
    })
    console.log("AAAAAA-5")
    if (user && user.userType == constants.userTypes.admin) {
        next();
    } else {
        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    }
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};
module.exports = authJwt;