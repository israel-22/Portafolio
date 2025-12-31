import { useState } from "react";
import "./PDA.css";
import Display from "./Display/display.jsx";

import RobCoLogo from "../../assets/icons/Robco_Logo.webp";
import RobCoSlogan from "../../assets/icons/RobCo_MDBP.webp";

export default function PDA({ isOpen, onClose }) {
  const [displayResetKey, setDisplayResetKey] = useState(0);

  function handleCancel() {
    setDisplayResetKey(prev => prev + 1);
  }

  return (
    <div className={`pda-overlay ${isOpen ? "show" : ""}`}>
      <div className="pda-container">

        {/* HEADER */}
        <div className="pda-header">
          <img
            src={RobCoLogo}
            alt="RobCo Industries Logo"
            className="robco-logo"
          />
          <div className="pda-led"></div>
        </div>

        <div className="pda-divider"></div>

        {/* BODY */}
        <div className="pda-body">
          | <Display key={displayResetKey}  onClose={onClose}/>
           ¿

          {/* CRT Display REAL  <Display mode={displayMode} onCancel={onClose} />*/}
          
         

          {/* Ventilación */}
          <div className="vent vent-left"></div>
          <div className="vent vent-right"></div>
        </div>

        <div className="pda-divider"></div>

        {/* FOOT */}
        <div className="pda-footer">
          <button className="pda-btn" onClick={onClose}>
            CLOSE
          </button>

          <img
            src={RobCoSlogan}
            alt="RobCo Industries Slogan"
            className="robco-slogan"
          />

          <button
            className="pda-btn"
            onClick={handleCancel}
          >
            CANCEL
          </button>
          
        </div>

      </div>
    </div>
  );
}
