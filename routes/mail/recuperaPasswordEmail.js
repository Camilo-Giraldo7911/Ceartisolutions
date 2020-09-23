const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const mailGunKeys = require("../../config/keys");
const MGapiKey = mailGunKeys.MAILGUN_API_KEY;
const MGdomain = mailGunKeys.DOMAIN;

const auth = {
  auth: {
    api_key: MGapiKey, //change to Live API key and domain
    domain: MGdomain,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, id) => {
  const mailOptions = {
    from: "dcamigira11@gmail.com", //este correo debe ser cambiado por el del cliente 
    to: email,
    subject: "Modificacion de cuenta",
    html: `
		<div style="border:1px solid black; padding:10px">
		    <h2>Actualizacion su cuenta</h2> 
        <hr />
        <p>Haga click en el enlace abajo para actualizar su cuenta:</p>
		    <a href="http://localhost:3000/recupera_cuenta/${id}">Click aqui</a> //aca se debe cambiar el localhost por el dominio del cliente 
		</div>`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

module.exports = sendMail;
