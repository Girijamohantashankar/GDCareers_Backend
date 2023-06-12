
var express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;
var User = require("../model/user");


exports.login = async function (req, res) {

    try {
        var name = req.headers.email.toLowerCase();
        var password = req.headers.password;
        const user = await User.findOne({
            $or: [{ email: name }, { username: name }],
        });
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.json({
                        message: "invalid",
                    });
                }
                if (result) {
                    let token = jwt.sign(
                        { userId: user._id },
                        process.env.JWT_TOKEN_KEY,
                        {
                            expiresIn: "12d",
                        }
                    );
                    res.status(200).json({
                        message: "login successful",
                        token: token,
                        email: user.email

                    });
                } else {
                    res.json({
                        message: "invalid",
                    });
                }
            });
        } else {
            res.json({
                message: "invalid",
            });
        }
    } catch (err) {
        res.json({
            message: "invalid",
        });
    }
};
