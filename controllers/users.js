const User = require('../models').User;
//import libs
const Bcrypt = require('bcryptjs');
const Moment = require('moment');

module.exports = {
    create(req, res) {
        console.log("req: %s", JSON.stringify(req.body.password));
        return User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: Bcrypt.hashSync(req.body.password, 8),
                domain: req.body.domain,
                role: req.body.role,
                lastSignedIn: Moment().format('MMMM DD YYYY, h:mm:ss a'),
                avatar: req.body.avatar,
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return User
            .findAll({
                attributes: ['id', 'name', 'domain', 'lastSignedIn', 'avatar']
                , order: [['name', 'ASC']]
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return User
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404)
                        .send({
                            message: "User not found",
                        })
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        console.log("req: %s", JSON.stringify(req.body));
        return User
            .find({
                where: {
                    id: req.params.userId,
                },
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User not found',
                    });
                }
                return user
                    .update({
                        name: req.body.name,
                        email: req.body.email,
                        password: Bcrypt.hashSync(req.body.password, 8),
                        domain: req.body.domain,
                        role: req.body.role,
                        lastSignedIn: Moment().format('MMMM DD YYYY, h:mm:ss a'),
                        avatar: req.body.avatar,
                    })
                    .then(() => res.status(200).send(user))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return User
            .find({
                where: {
                    id: req.params.userId,
                },
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found",
                    });
                }

                return user
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
