const express = require('express');


const logger = require('morgan');
const bodyParser = require('body-parser');

const multer = require('multer');
//let upload = multer({dest: 'public/avatars/'});

//require('./passport');
app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/*Use for load images from DB. Show into front-end*/
app.use('/public', express.static(__dirname + '/public'));


/*Routes for Login and API*/
require('./routes')(app);

/*Common route for test work express*/
app.get('/', (req, res) => res.status(200)
    .json({
        message: "Express is Working",
    }));

const storage = multer.diskStorage({
    destination: function (req, res, callback) {
        callback(null, 'public/avatars');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({storage: storage});

app.post('/public', upload.single('file'), function (req, res, next) {
    console.log(req.file);
});

module.exports = app;