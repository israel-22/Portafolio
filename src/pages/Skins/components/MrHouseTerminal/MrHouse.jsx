import { useState, useRef, useEffect } from "react";
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
  const dialogRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const [booting, setBooting] = useState(true);

  const dialogOptions = data.dialogOptions;
  const [visibleLines, setVisibleLines] = useState(1);

  const scrollUp = () => {
    dialogRef.current?.scrollBy({
      top: -70,
      behavior: "smooth",
    });

    setTimeout(updateScrollButtons, 250);
  };

  const scrollDown = () => {
    dialogRef.current?.scrollBy({
      top: 70,
      behavior: "smooth",
    });

    setTimeout(updateScrollButtons, 250);
  };

  const updateScrollButtons = () => {
    if (!dialogRef.current) return;

    const el = dialogRef.current;

    setCanScrollUp(el.scrollTop > 0);

    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 2);
  };

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
  const bootText = [
    "> ROBCO INDUSTRIES (TM) TERMLINK",
    "> PIP-OS v1.0 ",
    "> Initializing Personality Matrix...",
    "\\ Connecting to Lucky 38...",
    "MR. HOUSE ONLINE",
  ];
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);
useEffect(() => {

  if (!booting) return;

  let line = 1;

  const interval = setInterval(() => {

    line++;

    setVisibleLines(line);

    if (line >= bootText.length) {

      clearInterval(interval);

    }

  }, 450);

  return () => clearInterval(interval);
  

}, [booting, bootText.length]);

if (booting) {
    return (
      <div className="house-container boot-screen-house">
       <div className="boot-content">
  {bootText.slice(0, visibleLines).map((line, i) => (
    <p key={i} className="boot-line">
      <Typewriter
        text={line}
        speed={85}
        className="boot-typewriter"
      />
    </p>
  ))}
</div>
      </div>
    );
  }
  
  return (
    <div className="house-container">
      <img src={bgHouse} className="house-image" alt="Mr. House" />
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
        <h3 className="house-title">D:\\ MR. HOUSE TERMINAL</h3>
        {/* MENÚ */}
        {showQuestions && (
          <div className="dialog-scroll">
            <div className="dialog-list">
              {/* Barra lateral */}
              <div className="scroll-bar">
                <button
                  className={`scroll-arrow ${!canScrollUp ? "disabled" : ""}`}
                  onClick={scrollUp}
                >
                  ▲
                </button>

                <div className="scroll-line"></div>

                <button
                  className={`scroll-arrow ${!canScrollDown ? "disabled" : ""}`}
                  onClick={scrollDown}
                >
                  ▼
                </button>
              </div>

              {/* Preguntas */}
              <div
                className="dialog-content"
                ref={dialogRef}
                onScroll={updateScrollButtons}
              >
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
            <p className="dialog-text crt-house-text">
              <span className="flicker">
                <Typewriter text={response} />
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
