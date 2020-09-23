import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
import axios from "axios";

const Login = (props) => {
  // extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado } = authContext;
  //   const { mensaje, autenticado, iniciarSesion } = authContext;

  const [forgotPassword, setforgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [loadingAxiosReq, setloadingAxiosReq] = useState(false);

  // En caso de que el password o usuario no exista
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  // State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  // extraer de usuario
  const { email, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //Toggle olvido contraseña
  const toggleForgotPassword = () => {
    setforgotPassword(!forgotPassword);
    setErrorMessage("");
  };

  //Chequea si email existe en base de datos
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    if (checkEmail === "") {
      setErrorMessage("Debe ingresar su correo!");
      return;
    }

    setloadingAxiosReq(true);
    await axios
      .get("/check_email/" + checkEmail)
      .then(async (res) => {
        if (res.data === "") {
          setloadingAxiosReq(false);
          return setErrorMessage("Esta cuenta no existe!");
        } else {
          setloadingAxiosReq(false);
          let objData = {
            email: res.data.email,
            id: res.data._id,
          };

          await axios
            .post("correo_recuperar_ps", objData)
            .then(() => {
              alert("Por favor revise su correo");
              window.location.href = "/";
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login_user", {
        email,
        password,
      });
      localStorage.setItem("JWT", response.data.token);
      //   localStorage.setItem("STATUS", response.data.user.status);
      window.location.href = "/profile";
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}

      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <p
          style={{
            textAlign: "center",
            color: "red",
            fontSize: "16px",
            marginTop: "15px",
          }}
        >
          {errorMessage}
        </p>
        <p
          onClick={toggleForgotPassword}
          style={{
            textAlign: "center",
            marginTop: "20px",
            cursor: "pointer",
            color: "blue",
          }}
        >
          Olvido su contraseña?
          {forgotPassword ? (
            <span
              onClick={toggleForgotPassword}
              className="hide-forgot-password"
            >
              {" "}
              ocultar
            </span>
          ) : null}
        </p>

        {forgotPassword ? (
          <form className="forgotPasswordForm" onSubmit={handleCheckEmail}>
            <input
              className="campo-form btn-block"
              type="email"
              name="checkEmail"
              id="checkEmail"
              placeholder="Ingrese el email asociado con su cuenta"
              onChange={(e) => setCheckEmail(e.target.value)}
            />
            {loadingAxiosReq ? (
              <button className="newPassword-submit-btn" color="warning">
                Verificando...
              </button>
            ) : (
              <button
                className="text-center btn btn-recuperar-password btn-block"
                color="warning"
              >
                Solicitar nueva contraseña.
              </button>
            )}
          </form>
        ) : null}

        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
