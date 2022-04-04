/**
 * This file will contain the middlewares for valdiating the userId and email
 */
const User = require("../models/user.model");
const constants = require("../utils/constants");


validateSignupRequest = async (req, res, next) => {
    console.log("AAAAAAAA")
    
    //Validating the userName
    if (!req.body.name) {
        res.status(400).send({
            message: "Failed! Username is not provided !"
        });
        return;
    }
    console.log("AAAAAAAA2")
    
    if (!req.body.userId) {

        res.status(400).send({
            message: "Failed! UserId is not provided !"
        });
        return;
    }
    console.log("AAAAAAAA3")
    
    //Validating the userId 
    const user = await User.findOne({ userId: req.body.userId });
    if (user != null) {
        console.log("Inside this");
        res.status(400).send({
            message: "Failed! Userid  already exists!"
        });
        return;
    }
    console.log("AAAAAAAA4")
    //Validating the email Id
    if (!isValidEmail(req.body.email)) {
        res.status(400).send({
            message: "Failed! Email is not valid!"
        });
        return;
    }

    console.log("AAAAAAAA5")
    const email = await User.findOne({ email: req.body.email });
    if (email != null) {
        res.status(400).send({
            message: "Failed! Email already exists!"
        });
        return;
    }

    console.log("AAAAAAAA6")
    //Validateing the user type
    const userType = req.body.userType;
    const userTypes = [constants.userTypes.customer, constants.userTypes.engineer, constants.userTypes.admin]
    if (userType && !userTypes.includes(userType)) {
        res.status(400).send({
            message: "UserType provided is invalid. Possible values CUSTOMER | ENGINEER | ADMIN "
        });
        return;
    }
    console.log("AAAAAAAA7")
    next();


};


const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const verifySignUp = {
    validateSignupRequest: validateSignupRequest

};
module.exports = verifySignUp



