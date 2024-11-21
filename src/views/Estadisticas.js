import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const Historial = () => {
  const navigate = useNavigate();
  
  const [dataCardiaco, setDataCardiaco] = useState({
    labels: ["12:00", "12:03", "12:06", "12:09", "12:12", "12:15", "12:18", "12:21", "12:24", "12:27"],
    datasets: [
      {
        label: "Ritmo Cardíaco (BPM)",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  });

  const [dataTemperatura, setDataTemperatura] = useState({
    labels: ["12:00", "12:03", "12:06", "12:09", "12:12", "12:15", "12:18", "12:21", "12:24", "12:27"],
    datasets: [
      {
        label: "Temperatura Corporal (°C)",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  });

  const [actualBpm, setActualBpm] = useState(0);
  const [actualTemperatura, setActualTemperatura] = useState(0);

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
        }
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

    const ws = new WebSocket(`${process.env.REACT_APP_WS_URL}`);

    ws.onopen = function (event) {
      console.log("WebSocket opened:", event);
    };

    ws.onmessage = function (event) {
      const parsedData = JSON.parse(event.data);
      console.log("Received data:", parsedData); // Añadir logs para ver los datos recibidos
      switch (parsedData.topic) {
        case "sensor/bpm":
          setDataCardiaco((prevData) => {
            const newLabels = [...prevData.labels, new Date().toLocaleTimeString()];
            newLabels.shift();
            const newData = [...prevData.datasets[0].data, parsedData.valor];
            newData.shift();
            return {
              ...prevData,
              labels: newLabels,
              datasets: [{ ...prevData.datasets[0], data: newData }]
            };
          });
          setActualBpm(parsedData.valor);
          break;

        case "sensor/temperatura":
          setDataTemperatura((prevData) => {
            const newLabels = [...prevData.labels, new Date().toLocaleTimeString()];
            newLabels.shift();
            const newData = [...prevData.datasets[0].data, parsedData.valor];
            newData.shift();
            return {
              ...prevData,
              labels: newLabels,
              datasets: [{ ...prevData.datasets[0], data: newData }]
            };
          });
          setActualTemperatura(parsedData.valor);
          break;

        default:
          console.log("Unknown topic");
      }
    };

    return () => {
      ws.close();
    };
  }, [navigate]);

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tiempo',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valor',
        },
        min: 0,
        max: 200
      },
    },
  };

  return (
    <div className="Historial w-full min-h-screen bg-[#0d0d0d] flex flex-col items-center p-6 sm:p-10 lg:p-16 gap-4">
      <Link to="/inicio" className="absolute top-4 left-4 text-orange-500 text-3xl sm:text-4xl lg:text-5xl">
        <FaArrowLeft />
      </Link>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8">
        Estadísticas de Salud
      </h1>
  
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6">
        {/* Gráfico de Ritmo Cardíaco */}
        <div className="w-full lg:w-1/2 bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md text-white">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Curva de Tendencia del Ritmo Cardíaco
          </h2>
          <div className="chart-container mb-6 sm:mb-8">
            <Line data={dataCardiaco} options={options} />
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Medidas u Observaciones Filtradas de Ritmo Cardíaco
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse mt-2">
              <thead>
                <tr>
                  <th className="p-2 border-b-2 border-gray-300">Fecha y Hora</th>
                  <th className="p-2 border-b-2 border-gray-300">Ritmo Cardíaco (BPM)</th>
                  <th className="p-2 border-b-2 border-gray-300">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">2024-11-01 12:00</td>
                  <td className="p-2 border-b">{ actualBpm }</td>
                  <td className="p-2 border-b">Normal</td>
                </tr>
                {/* Más filas aquí */}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Gráfico de Temperatura Corporal */}
        <div className="w-full lg:w-1/2 bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md text-white">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Curva de Tendencia de Temperatura Corporal
          </h2>
          <div className="chart-container mb-6 sm:mb-8">
            <Line data={dataTemperatura} options={options} />
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Medidas u Observaciones Filtradas de Temperatura Corporal
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse mt-2">
              <thead>
                <tr>
                  <th className="p-2 border-b-2 border-gray-300">Fecha y Hora</th>
                  <th className="p-2 border-b-2 border-gray-300">Temperatura (°C)</th>
                  <th className="p-2 border-b-2 border-gray-300">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">2024-11-01 12:00</td>
                  <td className="p-2 border-b">{ actualTemperatura }</td>
                  <td className="p-2 border-b">Normal</td>
                </tr>
                {/* Más filas aquí */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historial;
