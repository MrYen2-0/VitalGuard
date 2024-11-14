import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Inicio.css";

export const Inicio = () => {
  return (
    <div className="Menu w-96 h-96 bg-white flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="Inicio w-96 h-96 relative bg-[#0d0d0d]">
        <div className="Si w-28 h-36 left-[180px] top-[640px] absolute text-black text-7xl font-['Inter'] z-50">
          SI
          /NO
        </div>

        <div className="Rectangle3 w-96 h-14 left-0 top-0 absolute bg-[#0d0d0d] shadow" />
        <div className="Vitalguard w-64 h-11 left-[732px] top-[10px] absolute text-center text-white text-4xl font-medium font-['Inter']">
          VitalGuard
        </div>
        <div className="Gps left-[1220px] top-[168px] absolute text-white text-4xl font-medium font-['Inter']">
          GPS
        </div>
        <img
          className="Thread9014924114705066579980284691 w-96 h-96 left-[974px] top-[256px] absolute"
          src="https://via.placeholder.com/660x438"
          alt="Placeholder"
        />
        <div className="absolute left-[66px] top-[129px] flex gap-4">
          <Link to="/estadisticas" className="VerTodasLasEstadisticas w-72 h-7 text-[#ff5b00] text-2xl font-medium font-['Inter']">
            Estadísticas de Salud
          </Link>
          <Link to="/historial" className="Historial w-48 h-7 text-[#ff5b00] text-2xl font-medium font-['Inter']">
            Historial
          </Link>
        </div>
        <div className="Datos w-96 h-96 left-[43px] top-[231px] absolute">
          <div className="Frame6 w-80 h-64 left-[47px] top-[66px] absolute justify-start items-start gap-2.5 inline-flex">
            <div className="Frame4 w-80 h-63 p-3 bg-gradient-to-b from-[#36373e] to-[#36373e] rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="RitmoCardeaco text-[#727272] text-xl font-light font-['Inter']">
                Ritmo Cardíaco
              </div>
              <div className="Frame24 w-72 h-44 relative">
                <div className="Group12 w-40 h-44 left-[68px] top-[6px] absolute">
                  <div className="Ellipse5 w-40 h-40 left-0 top-0 absolute rounded-full border-4 border-[#2121d9]" />
                  <div className="w-9 h-6 left-[42.95px] top-[64.75px] absolute text-[#9da9e9] text-xl font-semibold font-['Inter'] leading-normal">
                    169
                  </div>
                  <div className="Bpm w-10 h-4 left-[82px] top-[69.08px] absolute text-[#9da9e9] text-sm font-semibold font-['Inter'] tracking-widest">
                    BPM
                  </div>
                </div>
                <div className="IconmonstrMedical71 w-6 h-6 left-[141px] top-[100px] absolute" />
              </div>
            </div>
          </div>
          <div className="DatosActuales left-[73px] top-[4px] absolute text-white text-2xl font-medium font-['Inter']">
            Datos actuales:
          </div>
          <div className="Chaleco w-64 h-72 pl-7 pr-4 py-4 left-[80px] top-[330px] absolute bg-gradient-to-b from-[#36373e] to-[#36373e] rounded-lg flex-col justify-start items-start gap-9 inline-flex">
            <div className="LlevaPuestoElChaleco text-[#dc4d00] text-xl font-light font-['Inter']">
              Necesita Ayuda la persona
            </div>
          </div>
        </div>
        <div className="Temperatura w-96 h-80 left-[428px] top-[322px] absolute bg-[#0d0d0d]">
          <div className="FluentTemperature48Filled w-14 h-20 left-[234.08px] top-[91px] absolute" />
          <div className="TemperaturaDeNombre w-64 h-6 left-[132px] top-[280px] absolute text-center text-white text-xl font-medium font-['Inter']">
            Temperatura Corporal
          </div>
          <div className="Ellipse5 w-64 h-64 left-[132.08px] top-[9px] absolute rounded-full border-4 border-[#d9d9d9]" />
          <div className="w-11 h-9 left-[211px] top-[110.21px] absolute text-[#9da9e9] text-5xl font-semibold font-['Inter'] leading-10">
            23
          </div>
          <div className="C w-8 h-6 left-[260.08px] top-[104px] absolute text-[#9da9e9] text-4xl font-semibold font-['Inter'] tracking-widest">
            °C
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
