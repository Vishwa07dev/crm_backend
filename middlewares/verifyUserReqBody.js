/**
 * This file will contain the middlewares for valdiating the userId and email
 */
const User = require("../models/user.model");
const constants = require("../utils/constants");


validateUserRequestBody = async (req, res, next) => {

    //Validating the userName
    if (!req.body.name) {
        res.status(400).send({
            message: "Failed! Username is not provided !"
        });
        return;
    }
    if (!req.body.userId) {

        res.status(400).send({
            message: "Failed! UserId is not provided !"
        });
        return;
    }
    //Validating the userId 
    const user = await User.findOne({ userId: req.body.userId });
    if (user != null) {
        console.log("Inside this");
        res.status(400).send({
            message: "Failed! Userid  already exists!"
        });
        return;
    }
    //Validating the email Id
    if (!isValidEmail(req.body.email)) {
        res.status(400).send({
            message: "Failed! Email is not valid!"
        });
        return;
    }


    const email = await User.findOne({ email: req.body.email });
    if (email != null) {
        res.status(400).send({
            message: "Failed! Email already exists!"
        });
        return;
    }

    //Validateing the user type
    const userType = req.body.userType;
    const userTypes = [constants.userTypes.customer, constants.userTypes.engineer, constants.userTypes.admin]
    if (userType && !userTypes.includes(userType)) {
        res.status(400).send({
            message: "UserType provided is invalid. Possible values CUSTOMER | ENGINEER | ADMIN "
        });
        return;
    }

    next();


};


const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


validateUserStatusAndUserType = async (req, res, next) => {
    //Validateing the user type
    const userType = req.body.userType;
    const userTypes = [constants.userTypes.customer, constants.userTypes.engineer, constants.userTypes.admin]
    if (userType && !userTypes.includes(userType)) {
        res.status(400).send({
            message: "UserType provided is invalid. Possible values CUSTOMER | ENGINEER | ADMIN "
        });
        return;
    }
    //validting the userStatus
    const userStatus = req.body.userStatus;
    const userSatuses = [constants.userStatus.pending, constants.userStatus.approved, constants.userStatus.rejected]
    if (userStatus && !userSatuses.includes(userStatus)) {
        res.status(400).send({
            message: "UserStatus provided is invalid. Possible values PENDING | APPROVED | REJECTED "
        });
        return;
    }
    next();


}

const verifyUserRequestBody = {
    validateUserRequestBody: validateUserRequestBody,
    validateUserStatusAndUserType: validateUserStatusAndUserType

};
module.exports = verifyUserRequestBody



