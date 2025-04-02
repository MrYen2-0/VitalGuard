import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../assets/styles/Estadisticas.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export const Estadisticas = () => {

  const navigate = useNavigate();

  const [actualPromBpm, setActualPromBpm] = useState({
    dia: { valor: 0, fecha: "" },
    semana: { valor: 0, fecha: "" },
    mes: { valor: 0, fecha: "" },
  });

  const [anteriorPromBpm, setAnteriorPromBpm] = useState({
    dia: { valor: 0, fecha: "" },
    semana: { valor: 0, fecha: "" },
    mes: { valor: 0, fecha: "" },
  });

  const [anteriorPromTemperatura, setAnteriorPromTemperatura] = useState({
    dia: { valor: 0, fecha: "" },
    semana: { valor: 0, fecha: "" },
    mes: { valor: 0, fecha: "" },
  });

  const [actualPromTemperatura, setActualPromTemperatura] = useState({
    dia: { valor: 0, fecha: "" },
    semana: { valor: 0, fecha: "" },
    mes: { valor: 0, fecha: "" },
  });

  const downloadExcel = () => {
    const wsData = [
      ["Periodo", "Valor", "Fecha"], // Encabezados de columna
      ["Día (Actual BPM)", actualPromBpm.dia.valor, actualPromBpm.dia.fecha],
      ["Semana (Actual BPM)", actualPromBpm.semana.valor, actualPromBpm.semana.fecha],
      ["Mes (Actual BPM)", actualPromBpm.mes.valor, actualPromBpm.mes.fecha],
      ["Día (Anterior BPM)", anteriorPromBpm.dia.valor, anteriorPromBpm.dia.fecha],
      ["Semana (Anterior BPM)", anteriorPromBpm.semana.valor, anteriorPromBpm.semana.fecha],
      ["Mes (Anterior BPM)", anteriorPromBpm.mes.valor, anteriorPromBpm.mes.fecha],
      ["Día (Anterior Temperatura)", anteriorPromTemperatura.dia.valor, anteriorPromTemperatura.dia.fecha],
      ["Semana (Anterior Temperatura)", anteriorPromTemperatura.semana.valor, anteriorPromTemperatura.semana.fecha],
      ["Mes (Anterior Temperatura)", anteriorPromTemperatura.mes.valor, anteriorPromTemperatura.mes.fecha],
      ["Día (Actual Temperatura)", actualPromTemperatura.dia.valor, actualPromTemperatura.dia.fecha],
      ["Semana (Actual Temperatura)", actualPromTemperatura.semana.valor, actualPromTemperatura.semana.fecha],
      ["Mes (Actual Temperatura)", actualPromTemperatura.mes.valor, actualPromTemperatura.mes.fecha],
      [], // Fila vacía para separación visual
      ["Probabilidad de Ataque Cardíaco"], // Nuevo encabezado de sección
      ["Semana", actualPromBpm.semana.valor / 150 + "%"]
    ];

    // Crear el libro de trabajo
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    // Descargar el archivo Excel
    XLSX.writeFile(wb, "estadisticas.xlsx");
};


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
          return
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

    async function getProms() {
      try {
        // Obtener promedios de BPM
        const bpmResponseDia = await fetch(`${process.env.REACT_APP_API_URL}/records/prom/dia/bpm`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const bpmDataDia = await bpmResponseDia.json();
        setActualPromBpm((prevState) => ({
          ...prevState,
          dia: { valor: bpmDataDia.promActual, fecha: bpmDataDia.fechaActual },
        }));
        setAnteriorPromBpm((prevState) => ({
          ...prevState,
          dia: { valor: bpmDataDia.promAnterior, fecha: bpmDataDia.fechaAnterior },
        }));

        const bpmResponseSemana = await fetch(`${process.env.REACT_APP_API_URL}/records/prom/semana/bpm`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const bpmDataSemana = await bpmResponseSemana.json();
        setActualPromBpm((prevState) => ({
          ...prevState,
          semana: { valor: bpmDataSemana.promActual, fecha: bpmDataSemana.fechaActual },
        }));
        setAnteriorPromBpm((prevState) => ({
          ...prevState,
          semana: { valor: bpmDataSemana.promAnterior, fecha: bpmDataSemana.fechaAnterior },
        }));

        const bpmResponseMes = await fetch(`${process.env.REACT_APP_API_URL}/records/prom/mes/bpm`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const bpmDataMes = await bpmResponseMes.json();
        setActualPromBpm((prevState) => ({
          ...prevState,
          mes: { valor: bpmDataMes.promActual, fecha: bpmDataMes.fechaActual },
        }));
        setAnteriorPromBpm((prevState) => ({
          ...prevState,
          mes: { valor: bpmDataMes.promAnterior, fecha: bpmDataMes.fechaAnterior },
        }));

        // Obtener promedios de Temperatura
        const tempResponseDia = await fetch(`${process.env.REACT_APP_API_URL}/records/prom/dia/temperatura`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const tempDataDia = await tempResponseDia.json();
        setActualPromTemperatura((prevState) => ({
          ...prevState,
          dia: { valor: tempDataDia.promActual, fecha: tempDataDia.fechaActual },
        }));
        setAnteriorPromTemperatura((prevState) => ({
          ...prevState,
          dia: { valor: tempDataDia.promAnterior, fecha: tempDataDia.fechaAnterior },
        }));

        const tempResponseSemana = await fetch(`${process.env.REACT_APP_API_URL}/records/prom/semana/temperatura`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const tempDataSemana = await tempResponseSemana.json();
        setActualPromTemperatura((prevState) => ({
          ...prevState,
          semana: { valor: tempDataSemana.promActual, fecha: tempDataSemana.fechaActual },
        }));
        setAnteriorPromTemperatura((prevState) => ({
          ...prevState,
          semana: { valor: tempDataSemana.promAnterior, fecha: tempDataSemana.fechaAnterior },
        }));

        const tempResponseMes = await fetch(`${process.env.REACT_APP_API_URL}/records/prom/mes/temperatura`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const tempDataMes = await tempResponseMes.json();
        setActualPromTemperatura((prevState) => ({
          ...prevState,
          mes: { valor: tempDataMes.promActual, fecha: tempDataMes.fechaActual },
        }));
        setAnteriorPromTemperatura((prevState) => ({
          ...prevState,
          mes: { valor: tempDataMes.promAnterior, fecha: tempDataMes.fechaAnterior },
        }));
      } catch (error) {
        console.error(error);
      }
    }

    //checkToken();
    getProms();
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
                  <td className="p-2 border-b">{ anteriorPromBpm.dia.fecha }</td>
                  <td className="p-2 border-b">{ anteriorPromBpm.dia.valor }</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">{ actualPromBpm.dia.fecha }</td>
                  <td className="p-2 border-b">{ actualPromBpm.dia.valor }</td>
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
                  <td className="p-2 border-b">{ anteriorPromBpm.semana.fecha }</td>
                  <td className="p-2 border-b">{ anteriorPromBpm.semana.valor }</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">{ actualPromBpm.semana.fecha }</td>
                  <td className="p-2 border-b">{ actualPromBpm.semana.valor }</td>
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
                  <td className="p-2 border-b">{ anteriorPromBpm.mes.fecha }</td>
                  <td className="p-2 border-b">{ anteriorPromBpm.mes.valor }</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">{ actualPromBpm.mes.fecha }</td>
                  <td className="p-2 border-b">{ actualPromBpm.mes.valor }</td>
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
                  <td className="p-2 border-b">{ anteriorPromTemperatura.dia.fecha }</td>
                  <td className="p-2 border-b">{ anteriorPromTemperatura.dia.valor }</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">{ actualPromTemperatura.dia.fecha }</td>
                  <td className="p-2 border-b">{ actualPromTemperatura.dia.valor }</td>
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
                  <td className="p-2 border-b">{ anteriorPromTemperatura.semana.fecha }</td>
                  <td className="p-2 border-b">{ anteriorPromTemperatura.semana.valor }</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">{ actualPromTemperatura.semana.fecha }</td>
                  <td className="p-2 border-b">{ actualPromTemperatura.semana.valor }</td>
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
                  <td className="p-2 border-b">{ anteriorPromTemperatura.mes.fecha }</td>
                  <td className="p-2 border-b">{ anteriorPromTemperatura.mes.valor }</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">{ actualPromTemperatura.mes.fecha }</td>
                  <td className="p-2 border-b">{ actualPromTemperatura.mes.valor }</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      {/* Botón de descarga */}
      <div className="mt-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600" onClick={downloadExcel}>
          Descargar Estadísticas
        </button>
      </div>
    </div>
  );
}; 
export default Estadisticas;
