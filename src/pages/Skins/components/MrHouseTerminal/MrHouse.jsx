import { useState } from "react";
import papuAudio from "../../../../assets/house/papu.mp3";
import objetivoAudio from "../../../../assets/house/objetivo.mp3";
import bgHouse from "../../../../assets/house/house-background.webp";
import IconPipboy from "../../../../components/iconPipBoy/IconPipboy.jsx";
import Typewriter from "../../../../components/typewriter/Typewriter";
import "./mrHouse.css";

export default function MrHouse() {
  const [selected, setSelected] = useState(0);
  const [response, setResponse] = useState("");

  const dialogOptions = [
    {
      text: "¿Quién eres?",
      audio: papuAudio,
      answer: "Soy Mr. House. He vigilado New Vegas durante décadas.",
    },
    {
      text: "¿Cuál es tu objetivo?",
      audio: objetivoAudio,
      answer: "Preservar la ciudad y asegurar su futuro bajo mi control.",
    },
  ];

  const playAudio = (audio) => {
    const sound = new Audio(audio);
    sound.play();
  };

  const handleSelect = (index) => {
    setSelected(index);
    playAudio(dialogOptions[index].audio);
    setResponse(dialogOptions[index].answer);
  };

  return (
    <div
      className="house-container"
      style={{ backgroundImage: `url(${bgHouse})` }}
    >
      {/* 🔥 capa CRT efecto */}
      <div className="house-crt-effect">
        
      </div>

      <div className="house-overlay">

        <h2 className="house-title">MR. HOUSE TERMINAL</h2>

        {/* 🔹 LISTA DE PREGUNTAS */}
        <div className="dialog-list">
          {dialogOptions.map((opt, index) => (
            <div
              key={index}
              className={`dialog-item ${selected === index ? "active" : ""}`}
              onClick={() => handleSelect(index)}
              onMouseEnter={() => setSelected(index)}
            >
              <span>{selected === index ? ">" : " "}</span>
              <span>{opt.text}</span>
            </div>
          ))}
        </div>

        {/* 🔻 RESPUESTA NPC ABAJO */}
        <div className="dialog-response">
          <p>&gt; RESPONSE:</p>
          <p className="dialog-text">{response || "..."}</p>
        </div>

      </div>
    </div>
  );
}