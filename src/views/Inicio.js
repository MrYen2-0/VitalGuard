import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Inicio.css";

export const Inicio = () => {

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
        if (!response.ok) return;
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
  const [necesitaAyuda, setNecesitaAyuda] = useState("No");
  const [bpm, setBpm] = useState(109);
  const [temperatura, setTemperatura] = useState(36.9);

  const toggleNecesitaAyuda = () => {
    setNecesitaAyuda(necesitaAyuda === "Sí" ? "No" : "Sí");
  };

  useEffect(() => {
    if (necesitaAyuda === "Sí") {
      alert("La persona necesita ayuda");
    }
  }, [necesitaAyuda]);

  useEffect(() => {
    if (bpm > 110) {
      alert("Advertencia: El ritmo cardíaco es alto");
    } else if (bpm < 58) {
      alert("Advertencia: El ritmo cardíaco es bajo");
    }

    if (temperatura > 37.8) {
      alert("Advertencia: La temperatura corporal es alta");
    } else if (temperatura < 35.5) {
      alert("Advertencia: La temperatura corporal es baja");
    }
  }, [bpm, temperatura]);

  const getBpmBorderColor = () => {
    if (bpm > 110) return "#ff1b00";
    if (bpm >= 58 && bpm <= 109) return "#00d9ff";
    return "#001f4d";
  };

  const getTempBorderColor = () => {
    if (temperatura > 37.9) return "#ff1b00";
    if (temperatura >= 36 && temperatura <= 37.5) return "#00d9ff";
    return "#001f4d";
  };

  return (
    <div className="Menu w-full bg-[#0d0d0d] flex flex-col justify-center items-center p-10 sm:p-16 lg:p-20 gap-8">
      <div className="Inicio w-full bg-[#0d0d0d] py-0">
        <div className="Vitalguard text-center text-white text-3xl sm:text-4xl lg:text-5xl font-medium mb-6">
          VitalGuard
        </div>
        <div className="mb-4">
          <img  src="image.png" alt="Icono Viejo" className="w-16 sm:w-22 lg:w-32 mx-auto" />
        </div>
        <div className="Links flex flex-wrap justify-center gap-6 sm:gap-10 lg:gap-16 mt-4">
          <Link
            to="/estadisticas"
            className="text-[#ff5b00] text-xl sm:text-2xl lg:text-4xl font-medium"
          >
            Estadísticas de Salud
          </Link>
          <Link
            to="/historial"
            className="text-[#ff5b00] text-xl sm:text-2xl lg:text-4xl font-medium"
          >
            Historial
          </Link>
        </div>
  
        <div className="Datos flex flex-wrap justify-center items-start gap-8 sm:gap-12 mt-8 lg:mt-16">
          <div className="Frame4 w-56 sm:w-64 lg:w-80 p-4 sm:p-6 bg-gradient-to-b from-[#36373e] to-[#36373e] rounded-lg flex flex-col items-center gap-4 sm:gap-6">
            <div className="RitmoCardeaco text-[#ff5b00] text-2xl sm:text-3xl lg:text-4xl font-medium">
              Ritmo Cardíaco
            </div>
            <div
              className="Ellipse5 w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full border-4 flex items-center justify-center"
              style={{ borderColor: getBpmBorderColor() }}
            >
              <div className="text-center">
                <div className="text-[#9da9e9] text-4xl sm:text-5xl lg:text-6xl font-semibold">
                  {bpm}
                </div>
                <div className="text-[#9da9e9] text-sm sm:text-lg font-semibold tracking-widest">
                  BPM
                </div>
              </div>
            </div>
          </div>
  
          <div className="Temperatura w-56 sm:w-64 lg:w-80 p-4 sm:p-6 bg-gradient-to-b from-[#36373e] to-[#36373e] rounded-lg flex flex-col items-center gap-4 sm:gap-6">
            <div className="text-white text-2xl sm:text-3xl lg:text-2xl font-medium">
              Temperatura Corporal
            </div>
            <div
              className="Ellipse5 w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full border-4 flex items-center justify-center"
              style={{ borderColor: getTempBorderColor() }}
            >
              <div className="text-center">
                <div className="text-[#9da9e9] text-4xl sm:text-5xl lg:text-6xl font-semibold">
                  {temperatura}
                </div>
                <div className="text-[#9da9e9] text-sm sm:text-lg font-semibold tracking-widest">
                  °C
                </div>
              </div>
            </div>
          </div>
  
          <div className="Chaleco w-56 sm:w-64 lg:w-80 p-4 sm:p-6 bg-gradient-to-b from-[#36373e] to-[#36373e] rounded-lg flex flex-col items-center gap-4 sm:gap-6">
            <div
              className="text-2xl sm:text-3xl lg:text-4xl font-medium"
              style={{ color: necesitaAyuda === "Sí" ? "#ff1b00" : "#9da9e9" }}
            >
              Necesita Ayuda: {necesitaAyuda}
            </div>
            <button
              onClick={toggleNecesitaAyuda}
              className="mt-2 px-4 sm:px-6 py-2 sm:py-3 rounded bg-[#ff5b00] text-white hover:bg-[#e64a00]"
            >
              Cambiar Estado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};  
export default Inicio;
