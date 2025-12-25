import "./PDA.css";
import RobCoLogo from "../../assets/icons/Robco_Logo.webp";
import RobCoSlogan from "../../assets/icons/RobCo_MDBP.webp";

export default function PDA({ isOpen, onClose }) {
  return (
    <div className={`pda-overlay ${isOpen ? "show" : ""}`}>
      <div className="pda-container">

        {/* HEADER */}
        <div className="pda-header">
          <img src={RobCoLogo} alt="RobCo Industries Logo" className="robco-logo" />
         
          
           <div className="pda-led"> </div>
        </div>

        <div className="pda-divider"></div>

        {/* BODY */}
        <div className="pda-body">
          <div className="pda-crt-placeholder">
            <span>CRT MODULE</span>
          </div>

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
          <img src={RobCoSlogan} alt="RobCo Industries Slogan" className="robco-slogan" />
          <button className="pda-btn" onClick={""}>
            CANCEL
          </button>
        </div>

      </div>
    </div>
  );
}
