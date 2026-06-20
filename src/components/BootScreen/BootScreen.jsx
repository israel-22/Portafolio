import { useState, useEffect } from "react";
import "./bootScreen.css";
import IBM from "../../assets/boot/ibm.png";
import Vaulttec from "../../assets/boot/vaulttec.png";
import Robco from "../../assets/boot/robco.png";
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
  const [progress, setProgress] = useState(0);
  const [textDone, setTextDone] = useState(false);

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

        // si es el último mensaje → marcar fin
        if (messageIndex === messages.length - 1) {
          setTextDone(true);
          return currentMessage.length;
        }

        setMessageIndex(mi => mi + 1);
        return 0;
      }

      return prev - 1;
    });
  }, isDeleting ? 60 : 90);

  return () => clearTimeout(timeout);
}, [isDeleting, messageIndex, charIndex]);

useEffect(() => {
  if (progress >= 100) return;

  const interval = setInterval(() => {
    setProgress(prev => {
      if (prev >= 100) {
        clearInterval(interval);
        return 100;
      }
      return prev + 2;
    });
  }, 80);

  return () => clearInterval(interval);
}, [progress]);


useEffect(() => {
  if (progress < 100) return;

  const holdTimer = setTimeout(() => {
    setFadeOut(true);
  }, 4000);

  const finishTimer = setTimeout(() => {
    onFinish();
  }, 5000);

  return () => {
    clearTimeout(holdTimer);
    clearTimeout(finishTimer);
  };
}, [progress, onFinish]);

  

useEffect(() => {
  if (!textDone) return;
  if (progress >= 100) return;

  const interval = setInterval(() => {
    setProgress(prev => {
      if (prev >= 100) {
        clearInterval(interval);
        return 100;
      }
      return prev + 1; 
    });
  }, 250); 

  return () => clearInterval(interval);
}, [textDone, progress]);
useEffect(() => {
  if (!textDone) return;
  if (progress < 100) return;

  const holdTimer = setTimeout(() => {
    setFadeOut(true);
  }, 4000);

  const finishTimer = setTimeout(() => {
    onFinish();
  }, 5000);

  return () => {
    clearTimeout(holdTimer);
    clearTimeout(finishTimer);
  };
}, [textDone, progress, onFinish]);


 return (
  <div className="boot-layout">
    <div className={`boot-crt ${fadeOut ? "fade-out" : ""}`}>
      <canvas id="static-canvas"></canvas>

      {/* 🔷 LOGOS CORPORATIVOS */}
      <div className="boot-logos">
        <img src={Vaulttec} alt="Vault-Tec" />
        <img src={Robco} alt="RobCo" />
        <img src={IBM} alt="IBM Systems" />
        
      </div>

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

      {/* 🔷 BARRA DE CARGA */}
      <div className="boot-loading">
        <div className="boot-bar">
          <div className="boot-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p>INITIALIZING SYSTEM CORE... {progress}%</p>
      </div>

      {/* 🔷 FOOTER LEGAL */}
      <div className="boot-footer">
        <p>© VAULT-TEC CORPORATION</p>
        <p>© ROBCO INDUSTRIES UNIFIED OS</p>
        <p>IBM SYSTEMS DIVISION LICENSED TECHNOLOGY</p>
        <p>UNAUTHORIZED ACCESS WILL BE LOGGED</p>
      </div>
    </div>
  </div>
);
}