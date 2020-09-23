const sslRedirect = require("heroku-ssl-redirect");
const express = require("express");
const app = express();
const conectarDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");

require("./passport/passport")(passport);

// crear el servidor

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// conectar a la base de datos
conectarDB();

// habilitar cors
app.use(cors());
app.use(sslRedirect());

// habilitar express.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 3001;

//Passport Config
app.use(passport.initialize());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));
app.use("/", require("./routes/correo"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// arrancar la applicacion
app.listen(PORT, () => {
  console.log(`el servidor esta funcionando en el puerto ${PORT}`);
});
