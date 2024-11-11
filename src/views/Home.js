import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/styles/InicioSesion.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/inicio'); // Ajusta la ruta a donde quieras redirigir
  };

  return (
    <div className="lights-screen">
      <div className="overlap">
        <div className="rectangle" />
        <div className="text-wrapper">Inicio de sesión</div>
      </div>
      <div className="frame">
        <div className="text-wrapper-2">BIENVENIDO A VITALGUARD</div>
      </div>
      <div className="content">
        <div className="form">
          <div className="text-wrapper-3">Gmail</div>
          <input type="text" className="rectangle-2" />
          <div className="text-wrapper-4">Contraseña</div>
          <input type="password" className="rectangle-3" />
          <div className="text-wrapper-5">Olvidaste tu contraseñá?</div>
          <button className="button" onClick={handleLogin}>Entrar</button>
          <div className="text-wrapper-5">
            No tienes cuenta? <Link to="/register" className="register-link">Regístrate</Link>
          </div>
        </div>
        <img className="img" alt="Img" src="image.png" />
      </div>
    </div>
  );
};

export default Home;
