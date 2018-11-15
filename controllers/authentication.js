const User = require('../models').User;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JwtKey = require('../config/config');

require('../passport');

module.exports = {
    authenticate(req, res) {

        return User
            .find(
                {
                    limit: 1,
                    where: {name: req.body.name}
                })
            .then(user => {

                bcrypt.compare(req.body.password, user.password, function (err, valid) {
                    if (!valid) {
                        return res.status(404).send(err);
                    } else {
                        jwt.sign({
                            user: {
                                id: user.id,
                                name: user.name,
                                role: user.role,
                                avatar: user.avatar
                            }
                        }, JwtKey.key, {expiresIn: '24h'}, (err, token) => {
                            res.status(200).json({
                                "token": token
                            })
                        });
                    }
                });

            })
            .catch(error => res.status(400).json(error));
    }
};

