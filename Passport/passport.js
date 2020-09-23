const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();

// const salt = bcrypt.genSaltSync(10);

module.exports = function (passport) {
  passport.use(
    "local",
    new LocalStrategy(
      // Our user will sign in using an email, rather than a "username"
      {
        usernameField: "email",
      },
      function (email, password, done) {
        // When a user tries to sign in this code runs
        User.findOne({
          email,
        }).then((user) => {
          if (!user || !user.password) {
            return done(null, false, {
              message: "Este usuario no esta creado",
            });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "El correo o password no son validos",
              });
            }
          });
        });
      }
    )
  );

  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: process.env.SECRETA,
  };

  passport.use(
    "jwt",
    new JWTstrategy(opts, (jwt_payload, done) => {
      try {
        User.findOne({
          email: jwt_payload.email,
        }).then((user) => {
          if (user) {
            delete user.password;
            done(null, {
              email: user.email,
              status: user.status,
              nombre: user.nombre,
            });
          } else {
            console.log("user not found in db");
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    })
  );
};
