import "./PDA.css";
import React from "react";

function PDA({ isOpen, onClose }) {
  return (
    <div className={`pda-overlay ${isOpen ? "open" : ""}`}>
      <div className="pda-divice">
        {/*Carcaza Superior*/}
        <div className="pda-header">
          <snap className="pda-title">PERSONAL DATA ASSISTANT</snap>
          <button className="pda-close" onClick={onClose}>
            X
          </button>
        </div>
        {/*Pantalla (Placeholder CRT)*/}
        <div className="pda-screen">
          <div>SYSTEM READY</div>
        </div>

        {/*Controles inferiores (decorativos por ahora) */}
        <div className="pda-controls">
          <div className="pda-button"></div>
          <div className="pda-button"></div>
          <div className="pda-button"></div>
        </div>
      </div>
    </div>
  );
}
 export default PDA;
