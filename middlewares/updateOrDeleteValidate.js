const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const User = require('../models').User;

const JwtKey = require('../config/config');

module.exports = {
    validate(req, res, next) {
        console.log("req: %s", req.param.id);
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
                const decoded = jwtDecode(token)

                console.log("ID: %s", decoded.user.id);
                console.log("Role: %s", decoded.user.role);

                return User
                    .findById(req.body.id)
                    .then(user => {
                        if (!user) {
                            return res.status(404).json({error: 'No such user'});
                        }

                        console.log("User Found");
                        console.log("ID TOKEN: " + decoded.user.id);
                        console.log("ID userFindID: " + user.id);

                        if (decoded.user.role === 'admin') {
                            next();
                        }
                        else if (decoded.user.role === 'manager') {

                            if (decoded.user.id === user.id) {
                                console.log("True");
                                next();
                            }
                            else {
                                return res.status(403).json({message: "Forbidden"});
                            }
                        } else {
                            return res.status(403).json({
                                message: "You don't have rights for this operation"
                            });
                        }
                    })
                    .catch(() => {
                        console.log(err);
                    });
            });
        } else {
            res.status(403).json({error: "no Token"});
        }
    }
};