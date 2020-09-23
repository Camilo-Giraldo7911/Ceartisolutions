const express = require("express");
const router = express.Router();
const passport = require("passport");
const keys = require("../config/keys");
const EmailToCustomerRecuperarPs = require("./mail/recuperaPasswordEmail");
const EmailToCustomer = require("./mail/mailToCustomer");
const dbUser = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
// const verifyToken = require("../middleware/verifyToken");

const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Ruta para login user
router.post("/login_user", function (req, res, next) {
  const { email, password } = req.body;
  // generate the authenticate method and pass the req/res
  passport.authenticate("local", function (err, user, info) {
    if (!email || !password) {
      return;
    }
    if (err) {
      return res.status(401).json(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    // req / res held in closure
    req.logIn(user, () => {
      dbUser
        .findOne({
          email: req.body.email,
        })
        .then((user) => {
          user.password.delete;
          // console.log(user);
          const token = jwt.sign({ email: user.email }, process.env.SECRETA, {
            expiresIn: "3600000", //1 hora
          });
          res.status(200).send({
            token,
            user,
          });
        });
    });
  })(req, res, next);
});

router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    return res.json(req.user);
  }
);

// router.get("/profile", verifyToken, (req, res) => {
//   console.log(req.user);
//   return res.json(req.user);
// });

router.post("/correo", async (req, res) => {
  const { email, nombre, id } = req.body;
  try {
    EmailToCustomer(email, nombre, id, "Bienvenido/a", function (err, data) {
      if (err) {
        res.status(500).json({ message: "Internal Error!" });
      } else {
        res.json({ message: "Email Sent!" });
      }
    });

    return res.status(200).json({
      confirm: "Correo enviado",
    });
  } catch (error) {
    console.log(error.message);
    if (error.statusCode === 402) {
      res.status(402).send(error.message);
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

router.post("/correo_recuperar_ps", async (req, res) => {
  const { email, id } = req.body;
  try {
    EmailToCustomerRecuperarPs(email, id, "Verificacion", function (err, data) {
      if (err) {
        res.status(500).json({ message: "Internal Error!" });
      } else {
        res.json({ message: "Email Sent!" });
      }
    });

    return res.status(200).json({
      confirm: "Correo enviado",
    });
  } catch (error) {
    console.log(error.message);
    if (error.statusCode === 402) {
      res.status(402).send(error.message);
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

router.get("/validated_email/:id", async (req, res) => {
  dbUser.findOne(
    {
      _id: req.params.id,
    },
    function (error, found) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(found);
        res.send(found);
      }
    }
  );
});

router.get("/check_email/:email", async (req, res) => {
  dbUser.findOne(
    {
      email: req.params.email,
    },
    await function (error, found) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(found);
        res.send(found);
      }
    }
  );
});

router.put("/validated_email/:id", async (req, res) => {
  await dbUser.findOneAndUpdate(
    req.params.id,
    req.body,

    {
      returnNewDocument: true,
    },
    function (error, found) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(found);
        res.send(found);
      }
    }
  );
});

router.put("/change_password/:id", async (req, res) => {
  const encryptedPassword = bcrypt.hashSync(req.body.password, salt);

  await dbUser.findOneAndUpdate(
    req.params.id,
    { password: encryptedPassword },

    {
      returnNewDocument: true,
    },
    function (error, found) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(found);
        res.send(found);
      }
    }
  );
});

module.exports = router;
