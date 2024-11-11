import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/Restaurar.css";

const Restaurar = () => {
  return (
    <div className="lights-screen">
    <div className="text-wrapper">Restaurar Contraseñá</div>
      <div className="overlap">
        <div className="rectangle" />
      </div>
      <div className="frame">   
      </div>
      <div className="content">
        <div className="form">
          <div className="text-wrapper-3">Correo</div>
          <input type="text" className="rectangle-2" />
          <div className="text-wrapper-4">Contraseña</div>
          <input type="password" className="rectangle-3" />
          <div className="text-wrapper-6">Repite la contraseñá</div>
          <input type="password" className="rectangle-4" />
          <div className="text-wrapper-5">
            Ya tienes cuenta? <Link to="/" className="register-link">Inicia Sesion</Link>
          </div>
          <button className="button">Entrar</button>
        </div>
        <img className="img" alt="Img" src="IconoP.png" />
      </div>
    </div>
  );
};

export default Restaurar;
