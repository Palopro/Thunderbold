const usersController = require('../controllers').users;
const authController = require('../controllers').auth;


const path = require('path');
const fs = require('fs');

//require('../passport');

const AddValidate = require('../middlewares/addValidate').validate;
const UpdateOrDelete = require('../middlewares/updateOrDeleteValidate').validate;

module.exports = (app) => {
    /*Common route for test work /api route*/
    app.get('/api', (req, res) => {
        res.status(200).send({message: 'API is Online'})
    });

    // Create new
    app.post('/api/users', AddValidate, usersController.create);
    //Get All
    app.get('/api/users', usersController.list);
    //Get Single user
    //app.get('/api/users/:userId', usersController.retrieve);
    //Update User
    app.put('/api/users/:userId', UpdateOrDelete, usersController.update);
    //Delete
    app.delete('/api/users/:userId', UpdateOrDelete, usersController.delete);

    //auth
    app.post('/login', authController.authenticate);


};