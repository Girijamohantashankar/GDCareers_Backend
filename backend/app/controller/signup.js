
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.signup = async function(req,res){
  try{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.hash(user.password, 10, function (err, hashedPass) {
        if (err) {
          res.json({ error: err });
        } else {
          user.password = hashedPass;
          user.save()
          .then(async (savedUser) => {
              const token = jwt.sign( { userId: savedUser._id },process.env.JWT_TOKEN_KEY,{expiresIn: '7d'});
              res.status(200).json({
                message:"done properly",
                token:token,
                email:savedUser.email
              })
            })
              .catch((error) => {
              console.log("error singup:", error);
              res.json({
                message: "An error occurred while saving the user",
                error: error,
              });
            });
        }
      });
  }
  catch(err)
  {
    res.json('invalid');
  }
}

