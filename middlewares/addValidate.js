const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const User = require('../models').User;

const JwtKey = require('../config/config');

module.exports = {
    validate(req, res, next) {
        const authHeader = req.headers['authorization'];

        let token;

        if (authHeader) {
            token = authHeader.split(' ')[1];
        }

        if (token) {
            jwt.verify(token, JwtKey.key, (err) => {
                    if (err) {
                        return res.status(401).json({error: 'Failed to authenticate'});
                    }
                    const decoded = jwtDecode(token);
                    console.log(decoded.user.role);

                    return User
                        .find({
                            limit: 1,
                            name: decoded.user.name,
                        })
                        .then(user => {
                            if (!user) {
                                res.status(404).json({error: 'No such user'});
                            }

                            if (decoded.user.role === 'user' || decoded.user.role === 'manager') {
                                return res.status(403).json({
                                    message: "You don't have rights for this operation"
                                });
                            }
                            next();
                        })
                        .catch(() => {
                            console.log("Error");
                        });
                }
            );
        } else {
            res.status(403).json({error: "no Token"});
        }
    }
}
;
