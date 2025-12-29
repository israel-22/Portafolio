import { useState } from "react";
import "./display.css";
import HackerIcon from "../../../assets/icons/Hacker.webp";

export default function Display() {
  const [themeColor, setThemeColor] = useState("green"); // green | blue | red
  const [format, setFormat] = useState(null); // null | word | pdf
  const [language, setLanguage] = useState(null); // es | en
  format !== null && language !== null;

  function selectFormat(type) {
    setFormat(type);
    if (type === "word") setThemeColor("blue");
    if (type === "pdf") setThemeColor("red");
  }

  function selectLanguage(lang) {
    setLanguage(lang);
  }

  return (
    <div className={`display-screen display-${themeColor}`}>
      <div className="terminal-content">
        <p>ROB-CO INDUSTRIES</p>
        <p>SYSTEM STATUS: OK</p>

        {!format && (
          <>
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

        <span className="cursor"></span>

        {/* BOTÓN ÁMBAR DE DESCARGA */}
        {format !== null && language !== null && (
          <div className="display-actions">
            <button className="display-btn download">DOWNLOAD CV</button>
          </div>
        )}

        <div className="terminal-layout">
          <div className="terminal-content">
            {/* TODO tu contenido actual */}
          </div>
          <div className="terminal-side">
            <img
              src={HackerIcon}
              alt="Hacker Icon"
              className="terminal-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
