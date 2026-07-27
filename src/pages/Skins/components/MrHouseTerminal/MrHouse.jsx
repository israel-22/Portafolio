import { useState, useRef } from "react";
import data from "../../../../data/house.json";
import bgHouse from "../../../../assets/house/house-background.webp";
import Typewriter from "../../../../components/typewriter/Typewriter";
import "./mrHouse.css";
import audioMap from "./audioMap";

export default function MrHouse() {
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState("");
  const [showQuestions, setShowQuestions] = useState(true);
  const [lang, setLang] = useState("en");

  const currentAudio = useRef(null);

  const dialogOptions = data.dialogOptions;

  const playAudio = (file) => {
    if (!file) {
      console.warn("Audio no encontrado");
      return;
    }

    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
    }

    const sound = new Audio(file);
    currentAudio.current = sound;

    sound.onended = () => {
      setTimeout(() => {
        setResponse("");
        setSelected(null);
        setShowQuestions(true);
      }, 1200);
    };

    sound.play().catch((err) => {
      console.error("Error audio:", err);
    });
  };
  const handleSelect = (index) => {
    const option = dialogOptions[index];

    setSelected(index);
    setShowQuestions(false);

    setResponse(option.answer[lang]);

    playAudio(audioMap[option.audio[lang]]);
  };
  return (
    <div
      className="house-container"
      
    >
      <img
        src={bgHouse}
        className="house-image"
        alt="Mr. House"
    />
      <div className="house-overlay">
        {" "}
        <div className="lang-switch">
          <a onClick={() => setLang("en")}>
            <span>&gt; [F6] ENGLISH {lang === "en" ? "✔" : ""}</span>
          </a>

          <a onClick={() => setLang("es")}>
            <span>&gt; [F7] ESPAÑOL {lang === "es" ? "✔" : ""}</span>
          </a>
        </div>
        <h2 className="house-title">MR. HOUSE</h2>
        {/* MENÚ */}
       {/* MENÚ */}
{showQuestions && (
  <div className="dialog-scroll">
    <div className="dialog-list">

      {/* Scroll integrado */}
      <div className="scroll-bar">
        <span className="scroll-arrow">▲</span>

        <div className="scroll-line"></div>

        <span className="scroll-arrow">▼</span>
      </div>

      {/* Preguntas */}
      <div className="dialog-content">
        {dialogOptions.map((opt, index) => (
          <div
            key={opt.id}
            className={`dialog-item ${selected === index ? "active" : ""}`}
            onMouseEnter={() => setSelected(index)}
            onClick={() => handleSelect(index)}
          >
            <span className="cursor-symbol">
              {selected === index ? "▶" : ""}
            </span>

            <span>{opt.text[lang]}</span>
          </div>
        ))}
      </div>

    </div>
  </div>
)}
        {/* RESPUESTA */}
        {!showQuestions && (
          <div className="dialog-response">
            <p>&gt; MR. HOUSE:</p>
            <p className="dialog-text">
              <Typewriter text={response} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
