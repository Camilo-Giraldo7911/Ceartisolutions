import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";

class index extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await axios
      .put("/validated_email/" + id, { status: 1 })
      .then(() => localStorage.setItem("STATUS", 1))
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="validacion-container">
        <div className="contenedor-form sombra-dark">
          <h2>¡¡ Se valido su cuenta de forma satisfactoria !!</h2>
          <Link to={"/"} className="text-center btn btn-primario btn-block">
            Haga click aqui para ingresar
          </Link>
        </div>
      </div>
    );
  }
}

export default index;
