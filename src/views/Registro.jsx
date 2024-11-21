import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/styles/Registro.css";
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();

  const [gmail, setGmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPsw, setConfirmPsw] = useState(null);

  async function handleRegister() {

    try {
      if (password !== confirmPsw) {
        await Swal.fire({
          title: 'Alto',
          icon: 'warning',
          text: 'las contraseñas no coinciden'
        });
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gmail, password })
      })
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error: ", errorData);
        navigate("/");
        return;
      }
      const parsedResponse = await response.json();
      if (parsedResponse.success) {
        await Swal.fire({
          title: 'success',
          icon: 'success',
          text: parsedResponse.message
        }).then(() => navigate("/"));
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: 'ERROR',
        icon: 'error',
        text: 'internal server error'
      });
    }
  }

  return (
    <div className="lights-screen">
    <div className="text-wrapper">Registro</div>
      <div className="overlap">
        <div className="rectangle" />
      </div>
      <div className="frame">   
        <div className="text-wrapper-2">BIENVENIDO A VITALGUARD</div>
      </div>
      <div className="content">
        <div className="form">
          <div className="text-wrapper-3">Registre su Gmail</div>
          <input type="text" className="rectangle-2" onChange={(e) => setGmail(e.target.value)}/>
          <div className="text-wrapper-4">Contraseña</div>
          <input type="password" className="rectangle-3" onChange={(e) => setPassword(e.target.value)}/>
          <div className="text-wrapper-6">Repite la contraseñá</div>
          <input type="password" className="rectangle-4" onChange={(e) => setConfirmPsw(e.target.value)}/>
          <div className="text-wrapper-5">
            Ya tienes cuenta? <Link to="/" className="register-link">Inicia Sesion</Link>
          </div>
          <button className="button" onClick={handleRegister}>Entrar</button>
        </div>
        <img className="img" alt="Img" src="image.png" />
      </div>
    </div>
  );
};

export default Register;
