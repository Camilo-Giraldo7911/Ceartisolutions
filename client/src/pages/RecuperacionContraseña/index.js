import React, { Component } from "react";
import "./style.css";
import axios from "axios";

class index extends Component {
  constructor(props) {
    super();

    this.state = {
      password: "",
      confirmar: "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.password || !this.state.confirmar) {
      return alert("Ingrese la informacion en los campos requeridos");
    }
    // Password entre 8 y 15 caracteres, una Mayuscula y una minuscula
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    if (!this.state.password.match(passw)) {
      alert(
        "El password debe ser de al menos 8 caracteres y contener una letra mayuscula y un numero"
      );
      return;
    }

    if (this.state.password !== this.state.confirmar) {
      return alert("Passwords no coinciden");
    }
    const id = this.props.match.params.id;
    await axios
      .put("/change_password/" + id, { password: this.state.password })
      .then(() => {
        alert("Actualizacion de cuenta exitosa! \n Ya puede ingresar")(
          (window.location.href = "/")
        );
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="validacion-container">
        <div className="contenedor-form sombra-dark">
          <h2>Ingrese nueva contraseña</h2>
          <form onSubmit={this.onSubmit}>
            <div className="campo-form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Tu Password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>

            <div className="campo-form">
              <label htmlFor="confirmar">Confirmar Password</label>
              <input
                type="password"
                id="confirmar"
                name="confirmar"
                placeholder="Repite tu Password"
                value={this.state.confirmar}
                onChange={this.onChange}
              />
            </div>

            <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Realizar Registro"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default index;
