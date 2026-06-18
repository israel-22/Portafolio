import { useState, useEffect } from "react";
import "./bootScreen.css";

export default function BootScreen({ onFinish }) {
  const messages = [
    "WELCOME TO THE VINTAGE CRT TERMINAL",
    "SYSTEM INITIALIZING...",
    "LOADING MODULES...",
    "ALL SYSTEMS OPERATIONAL",
    "ENJOY THE RETRO EXPERIENCE!"
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Efecto de escritura
  useEffect(() => {
    const currentMessage = messages[messageIndex];

    const timeout = setTimeout(() => {
      setCharIndex(prev => {
        if (!isDeleting) {
          if (prev + 1 === currentMessage.length) {
            setIsDeleting(true);
          }
          return prev + 1;
        }

        if (prev - 1 <= 0) {
          setIsDeleting(false);
          setMessageIndex(mi => (mi + 1) % messages.length);
          return 0;
        }

        return prev - 1;
      });
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [isDeleting, messageIndex, charIndex]);

  // Fade y cierre
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 7000);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 8000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="boot-layout">
      <div className={`boot-crt ${fadeOut ? "fade-out" : ""}`}>
        <canvas id="static-canvas"></canvas>

        <div className="terminal-window">
          <div className="boot terminal-text">
            {">"} SYSTEM BOOTING... <br />
            {">"} MEMORY CHECK OK ... <br />
            {">"} INITIALIZING DISK DRIVE ... <br />
            {">"} LOADING OPERATING SYSTEM ... <br />
            {">"} WELCOME TO VINTAGE OS 1.0 <br />
            {">"} PIP-OS v1.0 <br />
            {">"} {messages[messageIndex].substring(0, charIndex)}
            <span className="cursor"></span>
          </div>
        </div>
      </div>
    </div>
  );
}