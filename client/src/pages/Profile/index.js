import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

class index extends Component {
  constructor(props) {
    super();

    this.state = {
      isLoading: true,
      error: false,
      validatedUser: false,
      nombre: "",
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    const accessString = localStorage.getItem("JWT");
    if (accessString === null) {
      this.setState({
        isLoading: false,
        error: true,
      });
    }

    axios
      .get("/profile", {
        headers: { Authorization: `JWT ${accessString}` },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "error") {
          this.setState({
            error: true,
            isLoading: false,
          });
          throw new Error(res.data.message);
        }
        if (res.data.status === 1) {
          this.setState({
            validatedUser: true,
          });
        }
        this.setState({
          isLoading: false,
          error: false,
          nombre: res.data.nombre,
        });
      })
      .catch((err) => console.log(err));
  }

  cerrarSession = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    const { isLoading, error } = this.state;
    if (error) {
      return (
        <div
          style={{
            marginLeft: "10%",
            fontSize: "30px",
            height: "100vh",
            marginTop: "120px",
          }}
        >
          ...Problema al tratar de ingresar, trate de login de nuevo
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
          <br />
          <br />
          <button>
            <Link className="text-center" to="/">
              Home
            </Link>
          </button>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div
          style={{
            marginLeft: "10%",
            fontSize: "30px",
            height: "100vh",
            marginTop: "120px",
          }}
        >
          Cargando Informacion.....
        </div>
      );
    }
    if (!this.state.validatedUser) {
      return (
        <div className="verificandoCuenta-container">
          Su cuenta no ha sido verificada. <br /> Revise su correo para mas
          informacion...
          <br />
          <br />{" "}
          <Link className="text-center" to="/">
            <button>&#8592; Volver a inicio</button>
          </Link>
        </div>
      );
    }
    return (
      <div className="perfil-container">
        <h2 className="perfil-title">
          Bienvenido {this.state.nombre.toUpperCase()}
        </h2>{" "}
        <hr />
        <h4 className="text-center">Contenido por definir preguntas frecuentes</h4>
        <button onClick={this.cerrarSession}>Cerrar Session</button>
      </div>
    );
  }
}

export default index;