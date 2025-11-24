import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//importação dos componentes 'pages'
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Lista from "./pages/Lista/Lista";
import Home from "./pages/Home/Home";

import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [contacts, setContacts] = useState([]);

  //funçãomde autenticação
  const handleLogin = (username, password) => {
    if (username === "admin" && password === "123") {
      setAuthenticated(true);
    } else {
      alert("Usuário ou senha inválidos!");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="login" />}
        />

        <Route
          path="/cadastro"
          element={
            isAuthenticated ? (
              <Cadastro contacts={contacts} setContacts={setContacts} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/lista"
          element={
            isAuthenticated ? (
              <Lista contacts={contacts} setContacts={setContacts} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
export default App;
