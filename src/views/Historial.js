import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../assets/styles/Estadisticas.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Estadisticas = () => {

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

  return (
    <div className="Estadisticas w-full min-h-screen bg-[#0d0d0d] flex flex-col justify-center items-center px-4 py-8 gap-8">
      <Link to="/inicio" className="absolute top-4 left-4 text-orange-500 text-3xl md:text-5xl">
        <FaArrowLeft />
      </Link>
      <h1 className="text-2xl md:text-4xl font-bold text-white text-center">Historial de Signos Vitales</h1>
  
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between gap-8">
        {/* Ritmo Cardíaco */}
        <div className="w-full md:w-1/2 bg-gray-900 p-4 md:p-6 rounded-lg shadow-md text-white">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Ritmo Cardíaco (Promedio)</h2>
          <div className="overflow-x-auto">
            <h3 className="text-lg md:text-xl font-medium mt-4">Por Día</h3>
            <table className="w-full text-left border-collapse mt-2 text-sm md:text-base">
              <thead>
                <tr>
                  <th className="p-2 border-b-2 border-gray-300">Fecha</th>
                  <th className="p-2 border-b-2 border-gray-300">Ritmo Cardíaco (BPM)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">2024-11-01</td>
                  <td className="p-2 border-b">70</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">2024-11-02</td>
                  <td className="p-2 border-b">75</td>
                </tr>
              </tbody>
            </table>
  
            <h3 className="text-lg md:text-xl font-medium mt-4">Por Semana</h3>
            <table className="w-full text-left border-collapse mt-2 text-sm md:text-base">
              <thead>
                <tr>
                  <th className="p-2 border-b-2 border-gray-300">Semana</th>
                  <th className="p-2 border-b-2 border-gray-300">Ritmo Cardíaco Promedio (BPM)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">Semana 1</td>
                  <td className="p-2 border-b">72</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">Semana 2</td>
                  <td className="p-2 border-b">74</td>
                </tr>
              </tbody>
            </table>
  
            <h3 className="text-lg md:text-xl font-medium mt-4">Por Mes</h3>
            <table className="w-full text-left border-collapse mt-2 text-sm md:text-base">
              <thead>
                <tr>
                  <th className="p-2 border-b-2 border-gray-300">Mes</th>
                  <th className="p-2 border-b-2 border-gray-300">Ritmo Cardíaco Promedio (BPM)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">Noviembre 2024</td>
                  <td className="p-2 border-b">73</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">Diciembre 2024</td>
                  <td className="p-2 border-b">71</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Temperatura Corporal */}
        <div className="w-full md:w-1/2 bg-gray-900 p-4 md:p-6 rounded-lg shadow-md text-white">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Temperatura Corporal (Promedio)</h2>
          <div className="overflow-x-auto">
            <h3 className="text-lg md:text-xl font-medium mt-4">Por Día</h3>
            <table className="w-full text-left border-collapse mt-2 text-sm md:text-base">
              <thead>
                <tr>
                  <th className="p-2 border-b-2 border-gray-300">Fecha</th>
                  <th className="p-2 border-b-2 border-gray-300">Temperatura (°C)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">2024-11-01</td>
                  <td className="p-2 border-b">36.6</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">2024-11-02</td>
                  <td className="p-2 border-b">36.7</td>
                </tr>
              </tbody>
            </table>
  
            <h3 className="text-lg md:text-xl font-medium mt-4">Por Semana</h3>
            <table className="w-full text-left border-collapse mt-2 text-sm md:text-base">
              <thead>
                <tr>
                  <th className="p-2 border-b-2 border-gray-300">Semana</th>
                  <th className="p-2 border-b-2 border-gray-300">Temperatura Promedio (°C)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">Semana 1</td>
                  <td className="p-2 border-b">36.5</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">Semana 2</td>
                  <td className="p-2 border-b">36.6</td>
                </tr>
              </tbody>
            </table>
  
            <h3 className="text-lg md:text-xl font-medium mt-4">Por Mes</h3>
            <table className="w-full text-left border-collapse mt-2 text-sm md:text-base">
              <thead>
                <tr>
                  <th className="p-2 border-b-2 border-gray-300">Mes</th>
                  <th className="p-2 border-b-2 border-gray-300">Temperatura Promedio (°C)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">Noviembre 2024</td>
                  <td className="p-2 border-b">36.5</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">Diciembre 2024</td>
                  <td className="p-2 border-b">36.6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      {/* Botón de descarga */}
      <div className="mt-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
          Descargar Estadísticas
        </button>
      </div>
    </div>
  );
}; 
export default Estadisticas;
