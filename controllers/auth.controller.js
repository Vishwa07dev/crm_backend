const User = require("../models/user.model");
const { userTypes } = require("../utils/constants");
const constants = require("../utils/constants");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");

/**
 * Controller for the signup flow
 */
exports.signup = async (req, res) => {
    /**
     * Inside the sign up call
     */
    var userStatus = req.body.userSatus;
    if(!req.body.userSatus){
       if(!req.body.userType || req.body.userType==constants.userTypes.customer){
        userStatus = constants.userStatus.approved;
       }else{
        userStatus = constants.userStatus.pending;  
       }
    }

    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: userStatus
    }

    try {
        const userCreated = await User.create(userObj);
        const postResponse = {
            name : userCreated.name,
            userId : userCreated.userId,
            email: userCreated.email,
            userTypes : userCreated.userType,
            userStatus : userCreated.userStatus,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
        res.status(201).send(postResponse);
    } catch (err) {
        console.err("Some error while saving the user in db", err.message);
        res.status(500).send({
            message: "Some internal error while inserting the element"
        })
    }

}


/**
 * Controller for the sign in flow
 */

/*
request type:
{
  nickname: 'xyz122',
  name: 'xyz122@gmail.com',
  picture: 'https://s.gravatar.com/avatar/70e12f0367a7834a7358f81e0e262310?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fxy.png',
  updated_at: '2022-04-25T19:52:26.375Z',
  email: 'xyz122@gmail.com',
  email_verified: false,
  sub: 'auth0|6266edd18aeb52006fc0d153',
  code: 'CtKbKLCQn18VXQMiyzvxhdvmf6C5nbI5zrkxJpAR9ksvX'
}
*/
exports.oauthsignin = async (req, res)=> {
    let user = await User.findOne({ userId: req.body.nickname });
    if (user == null){
        const userObj = {
            name: req.body.nickname,
            userId: req.body.nickname,
            email: req.body.email,
            userType: constants.userTypes.customer,
            password: bcrypt.hashSync("Hello@123", 8), //Default password
            userStatus:constants.userStatus.approved
        }
        try {
            const userCreated = await User.create(userObj);
            user = await User.findOne({ userId: req.body.nickname });
        } catch (err) {
            res.status(500).send({
                message: "Some internal error while inserting the element"
            })
        }

    }
    //Exchange Access code for access token and validate
    var token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: 120 // 2 minutes
      });
    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email: user.email,
        userTypes : user.userType,
        userStatus : user.userStatus,
        accessToken : token
      })

}
exports.signin = async (req, res)=> {

    //Fetch the user based on the userId
    //Validating the userId 
    const user = await User.findOne({ userId: req.body.userId });
    if (user == null) {
        res.status(400).send({
            message: "Failed! Userid doesn't exist!"
        });
        return;
    }

    if(user.userStatus != 'APPROVED'){
        res.status(200).send({
            message : `Can't allow login as user is in statuts : [ ${user.userStatus}]`
        })
        return ;
    }

    //Checkig if the password matches
    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: 120 // 2 minutes
      });

      res.status(200).send({
        name : user.name,
        userId : user.userId,
        email: user.email,
        userTypes : user.userType,
        userStatus : user.userStatus,
        accessToken : token
      })
   
}