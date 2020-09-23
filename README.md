# project-full-stack

Para usar esta aplicacion debe seguir los siguientes pasos:

- Clonar este repositorio en su computador
- Intalar todas las dependencias en la ruta base con el comando npm i (se instalaran automaticamente en el servidor y en el cliente)
- Crear un archivo en la ruta base llamado .env y dentro de este, crear dos variables: Coneccion a mongo en Atlas => <DB_MONGO=mongodb+srv://...> <SECRETA=unValorParaFirmarLosTokens> En produccion estas dos variables deberan crearse en el hosting (Heroku, AWS, por ejemplo), de lo contrario la app no funcionara
- Crear una cuenta en Mailgun https://www.mailgun.com/ que nos permitira el manejo de correos en nuetro front-end
- En la carpeta config crear un archivo llamado <keys_dev.js> el cual contendra el siguiente codigo:

```module.exports = {
 MAILGUN_API_KEY: <api key dada por Mailgun cuando se crea la cuenta>,
 DOMAIN: <Domain se encontrara en el dashboard de Mailgun en la pestaña de Sending>,
 }
```

Este modulo nos permitira hacer tests en modo desarrollo. Pero adicionalmente se debe autorizar una cuenta de correo para hacer dichos tests agregandose en la pestaña de Authorized recipients.
En produccion se deben agregar DNS records los cuales los provee Mailgun cuando se agrega un nuevo domain. Para informacion mas detallada de la configuracion con Mailgun y su domain name, el sgte. video muestra un tutorial (en ingles) de como hacerlo: https://www.youtube.com/watch?v=BmEj3EBo0vg&ab_channel=Mailgun

-El ultimo paso es usar npm start en la linea de comando para iniciar el servidor y el cliente los cuales correran en puertos 3001 y 3000 respectivamente...
