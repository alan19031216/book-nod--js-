const { sign } = require('jsonwebtoken');
const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');

const passportOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: "mySecretKey"
};

module.exports = passport => {
    passport.use(
        new Strategy(passportOptions, (jwt_payload, done) => {
            console.log("1")
            const username = jwt_payload.username;
            // here you would normally fetch the user from your database
            let authUser = {
                username: "alan",
                password: "abc"
            };
            if (authUser.username !== username) {
                return done(new Error('User not found'), null)
            } else {
                return done(null, authUser)
            }
        })
    );
};
