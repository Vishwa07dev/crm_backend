/**
 * Contollers for the user resource
 * Only the user of type ADMIN should be able to perform the operations
 * defined in the User Controller
 */
const User = require("../models/user.model");
const objectConvertor = require("../utils/objectConcverter");


/**
 * Fetch the list of users based on the filter of Status/UserType/Name
 */
exports.findAll = async (req, res) => {
    //Supporting the query param
    let userTypeReq = req.query.userType;
    let userStatusReq = req.query.userStatus;
    let userNameReq = req.query.name;

    var users;
    if (userNameReq) {
        try {
            users = await User.find({
                userName: userNameReq
            });
        } catch (err) {
            console.err("error while fetching the user for userName : ", userNameReq);
            res.status(500).send({
                message: "Some internal error occured"
            })
        }
    } else if (userTypeReq && userStatusReq) {
        try {
            users = await User.find({
                userType: userTypeReq,
                userStatus: userStatusReq
            });
        } catch (err) {
            console.err(`error while fetching the user for userType [${userTypeReq}] and userStatus [${userStatusReq}]`);
            res.status(500).send({
                message: "Some internal error occured"
            })
        }
    } else if (userTypeReq) {

        try {
            users = await User.find({
                userType: userTypeReq
            });
        } catch (err) {
            console.err(`error while fetching the user for userType [${userTypeReq}] `);
            res.status(500).send({
                message: "Some internal error occured"
            })
        }
    } else if (userStatusReq) {

        try {
            users = await User.find({
                userStatus: userStatusReq
            });

        } catch (err) {
            console.err(`error while fetching the user for userStatus [${userStatusReq}] `);
            res.status(500).send({
                message: "Some internal error occured"
            })
        }
    } else {
        try {
            users = await User.find();

        } catch (err) {
            console.err(`error while fetching the users `);
            res.status(500).send({
                message: "Some internal error occured"
            })
        }
    }
    res.status(200).send(objectConvertor.userResponse(users))
}

/**
 * Fetch the user data based on the userId
 */
exports.findById = async (req, res) => {
    const userIdReq = req.params.userId;

    const user = await User.find({
        userId: userIdReq
    })

    if (user) {
        res.status(200).send(objectConvertor.userResponse(user));
    } else {
        res.status(200).send({
            message: `User with this id [${userIdReq}] is not present`
        })
    }

}

/**
 * Update the user status
 */

exports.update = async (req, res) => {
    const userIdReq = req.params.userId;
    try {
        const user = await User.findOneAndUpdate({
            userId: userIdReq
        }, {
            userName: req.body.userName,
            userStatus: req.body.userStatus,
            userType: req.body.userType

        }).exec();
        res.status(200).send({

            message: `User record has been updated successfully`

        });
    } catch (err) {
        console.err("Error while updating the record", err.message);
        res.status(500).send({
            message: "Some internal error occured"
        })

    };
}

