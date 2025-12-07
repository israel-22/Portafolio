import "./footer.css";
import ibmLogo from "../../assets/icons/ibm.png";
//import whatsappIcon from "../../assets/icons/whatsapp.png";
// //import telegramIcon from "../../assets/icons/telegram.png";
//import mailIcon from "../../assets/icons/mail.png";
function Footer() {
  return (
    <footer className="retro-footer">
      {/* Panel izquierdo */}
      <div className="footer-block">
        <div className="footer-title">
          {" "}
          RETRO SYSTEM 2.0
          <img src={ibmLogo} alt="IBM Logo" className="footer-logo" />
        </div>
        <p className="footer-subtext">Terminal Emulator · 1984 Edition</p>
      </div>{" "}
      {/* Panel central — botones */}{" "}
      <div className="footer-buttons">
        <button className="retro-btn sticker">
          {" "}
          <img src={""} className="sticker-icon" />{" "}
        </button>
        <button className="retro-btn sticker">
          <img src={""} className="sticker-icon" />
        </button>{" "}
        <button className="retro-btn sticker">
          <img src={""} className="sticker-icon" />
        </button>
      </div>
      {/* Panel derecho — estado */}
      <div className="footer-status">
        <div className="led"></div>
        <span className="status-text">ONLINE</span>
      </div>
    </footer>
  );
}
export default Footer;
