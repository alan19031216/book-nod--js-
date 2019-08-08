const passport = require('passport');



module.exports = function authenticateRoute(req,res,next){
  passport.authenticate('jwt', {
    session: false
  },(err, user, info) => {
    console.log("3")
        if(err || !user) {

            const errors = {};
            errors.code = "UNAUTHORIZED";
            errors.message = "UNAUTHORIZED";
            return res.status(400).json(errors); // send the error response to client
        }
        console.log(user)
        // Checking on blocking//
        req.user = user;

        /*if(user.status === false){
          const errors = {};
          errors.code = error.UNAUTHORIZED;
          errors.message = errorMessage.UNAUTHORIZED;
          return res.status(400).json(errors); // send the error response to client
        }*/

        // if(req.headers['api-key'] !== conKey.APIKEY){
        //   return returnError(req,404,"INVALIDKEY", res);
        // }

        console.log('[---Username : '+req.user.username+'---]')
        next();
              //return next();
    })(req, res, next);
};
