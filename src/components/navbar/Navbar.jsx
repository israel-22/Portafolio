import "./navbar.css";
import ibmLogo from "../../assets/icons/ibm.png";
import { useEffect } from "react";

function Navbar() {

 
  useEffect(() => {
    const buttons = document.querySelectorAll(".retro-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.add("flash");

        setTimeout(() => {
          btn.classList.remove("flash");
        }, 150);
      });
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <nav className="retro-nav">
      <div className="nav-title">
        RETRO SYSTEM
        <img src={ibmLogo} alt="IBM Logo" className="icon" />
      </div>

      <div className="nav-buttons">
        <button className="retro-btn" data-sound="click1">Home</button>
        <button className="retro-btn" data-sound="click1">Proyectos</button>
        <button className="retro-btn" data-sound="click1">Contacto</button>
      </div>

      <div className="nav-status">
        <div className="led"></div>
        <span className="status-text">ONLINE</span>
      </div>
    </nav>
  );
}

export default Navbar;
