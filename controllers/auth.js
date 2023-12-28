const jwt = require('jsonwebtoken');

const User = require('../model/user');

const bcrypt = require('bcryptjs');

exports.login = (req, res, next) => {
    const userid = req.body.userid;
    const password = req.body.password;
    /*const userid = "tester103";
    const password = "admin123";
    const customerid = "IJ103";*/
    let loadedUser;


    /*to create user credentials in db */
    /*bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                userid: userid,
                password: hashedPw,
                customerid: customerid
            });
            return user.save();
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
        */



    User.findOne({ userid: userid })
        .then(user => {
            console.log("before userid compare");

            if (!user) {
                const error = new Error('A user with this userid could not be found.');
                error.statusCode = 401;

                throw error;
            }

            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })

        .then(isEqual => {
            console.log("before PWD compare");
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                console.log("401 error zone - password wrong");
                throw error;
            }
            console.log("after pwd compare");
            console.log("before token generation");
            const token = jwt.sign(
                {
                    userid: loadedUser.userid,
                    customerid: loadedUser.customerid
                },
                'somesupersecretsecret',
                { expiresIn: '1h' }

            );
            console.log("after token generation");

            res.status(200).json({ token: token, customerid: loadedUser.customerid });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });


}
