const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('./models').User;


passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
}, function (username, password, done) {
    User.find({where: {username: name}}, function (err, user) {
        return err ? done(err) : user
            ? password === user.password
                ? done(null, user)
                : done(null, false, {message: 'incorrect password'})
            : done(null, false, {message: "incorrect username"});

    })
}));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'powercode'
    },
    function (jwtPayload, cb) {

        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));