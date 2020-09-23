import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import CuentaConfirmada from "./pages/CuentaConfirmada";
import RecuperacionCuenta from "./pages/RecuperacionContraseña";
import Proyectos from "./components/proyectos/Proyectos";

import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/token";
import RutaPrivada from "./components/rutas/RutaPrivada";
import Profile from "./pages/Profile";

// Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
                <Route exact path="/profile" component={Profile} />                
                <Route
                  exact
                  path="/validated_email/:id"
                  component={CuentaConfirmada}
                />
                <Route
                  exact
                  path="/recupera_cuenta/:id"
                  component={RecuperacionCuenta}
                />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
