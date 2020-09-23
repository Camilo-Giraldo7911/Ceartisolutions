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

const sendMail = (email, nombre, id) => {
  const mailOptions = {
    from: "dcamigira11@gmail.com", //este correo debe ser cambiado por el del cliente
    to: email,
    subject: "Bienvenido",
    html: `
		<div style="border:1px solid black; padding:10px">
		    <h2>Bienvenido ${nombre}</h2> 
	    	<hr />
		    <a href="http://localhost:3000/validated_email/${id}">Click para Activar cuenta e ingresar</a>
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
