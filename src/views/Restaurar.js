import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/styles/Restaurar.css";

const Restaurar = () => {

  const navigate = useNavigate();

  useEffect(() => {
    async function checkToken() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
        if (!response.ok) {
          navigate("/");
          return;
        };
        const parsedResponse = await response.json();
        if (!parsedResponse.success) {
          console.log("not authorized");
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    }

    checkToken();
  }, []);
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
