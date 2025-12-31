import { useState } from "react";
import "./display.css";
import HackerIcon from "../../../assets/icons/Hacker.webp";

export default function Display({ onClose }) {
  const [themeColor, setThemeColor] = useState("green");
  const [format, setFormat] = useState(null);
  const [language, setLanguage] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  function selectFormat(type) {
    setFormat(type);
    if (type === "word") setThemeColor("blue");
    if (type === "pdf") setThemeColor("red");
  }

  function selectLanguage(lang) {
    setLanguage(lang);
  }

  function resetDisplay() {
    setFormat(null);
    setLanguage(null);
    setThemeColor("green");
  }

  function downloadCV() {
    if (!format || !language || isDownloading) return;

    setIsDownloading(true);

    // Sonido de descarga
    const beep = new Audio("/src/assets/sounds/beep.mp3");
    beep.play();

    //  Archivos reales
    const fileMap = {
      pdf: {
        es: "/cv/cv_desarrollador_es.pdf",
        en: "/cv/cv_desarrollador_en.pdf",
      },
      word: {
        es: "/cv/cv_desarrollador_es.docx",
        en: "/cv/cv_desarrollador_en.docx",
      },
    };

    const filePath = fileMap[format][language];

    // ⬇ Descarga
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    //  Reset + cerrar PDA

    setTimeout(() => {
      resetDisplay();
    }, 3000);

    setTimeout(() => {
      onClose();
      setIsDownloading(false);
    }, 5000);
  }

  return (
    <div className={`display-screen display-${themeColor}`}>
      <div className="terminal-layout">
        {/* IZQUIERDA */}
        <div className="terminal-content">
          <p>ROB-CO INDUSTRIES</p>
          <p>SYSTEM STATUS: OK</p>

          {!format && (
            <>
              <p>DOWNLOAD: CV ISRAEL SANTOS</p>
              <p>SELECT OUTPUT FORMAT</p>

              <div className="display-actions">
                <button
                  className="display-btn"
                  onClick={() => selectFormat("word")}
                >
                  [F1] WORD
                </button>
                <button
                  className="display-btn"
                  onClick={() => selectFormat("pdf")}
                >
                  [F2] PDF
                </button>
              </div>
            </>
          )}

          {format && (
            <>
              <p>FORMAT: {format.toUpperCase()}</p>
              <p>SELECT LANGUAGE</p>

              <div className="display-actions">
                <button
                  className="display-btn"
                  onClick={() => selectLanguage("es")}
                >
                  [F1] ESPAÑOL
                </button>
                <button
                  className="display-btn"
                  onClick={() => selectLanguage("en")}
                >
                  [F2] ENGLISH
                </button>
              </div>

              {language && <p>LANGUAGE: {language.toUpperCase()}</p>}
            </>
          )}

          {/* BOTÓN ÁMBAR */}
          {format && language && (
            <div className="display-actions download-center">
              <button
                className={`display-btn download ${
                  isDownloading ? "flash" : ""
                }`}
                onClick={downloadCV}
                disabled={isDownloading}
              >
                {isDownloading ? "DOWNLOADING..." : "DOWNLOAD CV"}
              </button>
            </div>
          )}

          <span className="cursor"></span>
        </div>

        {/* DERECHA */}
        <div className="terminal-side">
          <img src={HackerIcon} alt="Hacker Icon" className="terminal-image" />
        </div>
      </div>
    </div>
  );
}
