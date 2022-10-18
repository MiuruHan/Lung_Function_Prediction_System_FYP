const User = require('../models/user')
const {use} = require("express/lib/router");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res) => {
    const {fullName, address, contactNo, email, password} = req.body

    if (fullName === "" || address === "" || contactNo === "" || email === "" || password === "") {
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    } else {
        User.find({email})
            .then(userFromDB => {
                if (userFromDB.length > 0) {
                    res.json({
                        Status: "Unsuccessful",
                        Message: "There is a user with this email address already."
                    })
                } else {
                    const user = new User({
                        fullName,
                        address,
                        contactNo,
                        email,
                        password
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if (err) throw err;
                            user.password = hash;
                            user.save()
                                .then(result => {
                                    res.json({
                                        Status: "Successful",
                                        Message: 'User has been saved successfully.',
                                        User: result
                                    })
                                })
                                .catch(error => {
                                    res.json({
                                        Status: "Unsuccessful",
                                        Message: "Happened saving the user in " +
                                            "DB.",
                                        error: error
                                    })
                                })
                        })
                    })
                }
            })
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    //Validation
    if (!email || !password) {
        res.json({Status: "Unsuccessful", Message: 'Email and password must be entered.'});
    }

    //Check for existing user
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                res.json({Status: "Unsuccessful", Message: 'Invalid user email.'})
            } else {
                //Validating password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            res.json({Status: "Unsuccessful", Message: "Password is incorrect."})
                        } else {
                            res.json({
                                Status: "Successful",
                                Message: 'User has been logged successfully.',
                                User: user
                            })
                        }
                    })
                    .catch(error => {
                        res.json({Status: "Unsuccessful", Message: error})
                    })
            }
        })
        .catch(error => {
            res.json({Status: "Unsuccessful", Message: error})
        })
}
exports.getUsers = async (req, res) => {
    User.find()
        .then(users => {
            res.json({
                "Status": "Successful",
                "Users": users
            })
        })
        .catch(error => {
            res.json({
                "Status": "Unsuccessful",
                "Error": error
            })
        })
}

