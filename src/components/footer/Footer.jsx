import { useEffect, useState } from "react";
import "./footer.css";
import ibmLogo from "../../assets/icons/ibm.png";
import githubIcon from "../../assets/icons/github-retro.png";
import linkedinIcon from "../../assets/icons/linkedin-retro.png";
import gmailIcon from "../../assets/icons/gmail-retro.png";
import whatsappIcon from "../../assets/icons/whatsapp-retro.png";





function Footer({onOpenPDA}) {
const [hours, setHours] = useState("00");
const [minutes, setMinutes] = useState("00");
const [blink, setBlink] = useState(true);


//Reloj Dijital
useEffect(() => {
  const updateClock = () => {
    const now = new Date();

    setHours(String(now.getHours()).padStart(2, "0"));
    setMinutes(String(now.getMinutes()).padStart(2, "0"));
    setBlink(b => !b);
  };

  updateClock();
  const interval = setInterval(updateClock, 1000);

  return () => clearInterval(interval);
}, []);




  return (
    <footer className="retro-footer">
      {/* Panel izquierdo */}
      <div className="footer-block">
        <div className="footer-title">
          RETRO SYSTEM 2.0
          <img src={ibmLogo} alt="IBM Logo" className="footer-logo" />
        </div>
        <p className="footer-subtext"> &reg; RobCo Pip-Boy 3000. 1984 Edition</p>
      </div>


      {/* Panel central — botones */}
      <div className="footer-buttons">
        <a href="https://github.com/israel-22" target="_blank" >
        <button className="retro-btn">
          <img src={githubIcon} alt="GitHub" className="sticker-icon" />
        </button>
        </a>


         <a href="https://www.linkedin.com/in/israel-766580314/" target="_blank" >
        <button className="retro-btn">
          <img src={linkedinIcon} alt="LinkedIn" className="sticker-icon" />
        </button>
        </a>


          <a href="mailto:santosdeisrael39@gmail.com" target="_blank" >
        <button className="retro-btn">
          <img src={gmailIcon} alt="Gmail" className="sticker-icon" />
        </button>
        </a>

           <a href="https://wa.me/0995785000" target="_blank" >
        <button className="retro-btn">
          <img src={whatsappIcon} alt="WhatsApp" className="sticker-icon" />
        </button>
        </a>
        {/*BOTON ESPECIAL CV */}
        <button className="retro-btn cv-btn" onClick={onOpenPDA}>
          DOWNLOAD CV
        </button>

      </div>

      


      {/* Panel derecho — estado */}
      <div className="footer-status">
        <div className="led"></div>
        <span className="status-text">ONLINE</span>
        <span className="digital-clock">
       <span className="digit">{hours[0]}</span>
       <span className="digit">{hours[1]}</span>

       <span className={`colon ${blink ? "on" : "off"}`}>:</span>

       <span className="digit">{minutes[0]}</span>
       <span className="digit">{minutes[1]}</span>
</span>


      </div>
    </footer>
  );
}
export default Footer;
