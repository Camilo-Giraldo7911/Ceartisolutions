const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // leer eltoken del header
  //   const token = req.header("x-auth-token");
  //   // revisar si no hay token
  //   if (!token) {
  //     return req.status(401).json({ msg: "No hay token, permiso no valido" });
  //   }
  //   // validarel token
  //   try {
  //     const cifrado = jwt.verify(token, process.env.SECRETA);
  //     req.body.usuario = cifrado.usuario;
  //     next();
  //   } catch (error) {
  //     res.status(401).json({ msg: "Token no valido" });
  //   }
};
