import "./PDA.css";

function PDA({ isOpen, onClose }) {
  return (
    <div className={`pda-overlay ${isOpen ? "open" : ""}`}>
      <div className="pda-device">
        {/* Carcasa superior */}
        <div className="pda-header">
          <span className="pda-title">PERSONAL DATA ASSISTANT</span>
          <button className="pda-close" onClick={onClose}>✕</button>
        </div>

        {/* Pantalla (placeholder CRT) */}
        <div className="pda-screen">
          <p>SYSTEM READY</p>
        </div>

        {/* Controles inferiores (decorativos por ahora) */}
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
