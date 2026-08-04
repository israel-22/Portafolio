import React from "react";

import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";
import "./skins.css";

import House from "./components/MrHouseTerminal/MrHouse.jsx";

import ibmLogo from "../../assets/icons/ibm.png";
import atomCurrency from "../../assets/icons/FO76_Atom_Currency_2.webp";
import pistolIcon from "../../assets/icons/FO76_iconwheel_pistol.webp";
import briefcaseIcon from "../../assets/icons/FO76NW_icons_briefcase.webp";
import specialIcon from "../../assets/icons/FO76_vaultboy_endurance.webp";

function Skins() {
  return (
    <div className="home-container">
      <div className="glow"></div>
      <h1>C:\\ Mi Portafolio Retro</h1>

      <div className="icon-grid">
        <IconPipboy src={atomCurrency} alt="Atom Currency" />
        <IconPipboy src={pistolIcon} alt="Pistol Icon" />
        <IconPipboy src={ibmLogo} alt="IBM Logo" />
        <IconPipboy src={briefcaseIcon} alt="Briefcase Icon" />
        <IconPipboy src={specialIcon} alt="Special Icon" />
      </div>

      <p>
       ⚠ NOTA IMPORTANTE - CSS GLOBAL EN REACT

Los archivos CSS importados en React NO están aislados. Todo el CSS se carga de forma global en el navegador.

Los @keyframes, :root, body, html y demás reglas globales COMPARTEN el mismo espacio de nombres entre todos los componentes.

Si dos páginas utilizan el mismo nombre (por ejemplo: @keyframes crt-flicker), la última definición reemplazará a la anterior y puede romper efectos en otros componentes.

✔ Convención del proyecto:
- home-*
- house-*
- radio-*
- tv-*
- arcade-*
- navbar-*
- footer-*

Ejemplo:
@keyframes house-screenShift
@keyframes home-crt-flicker
@keyframes radio-static

Siempre verificar nombres duplicados antes de modificar animaciones o agregar nuevos componentes.
      </p>
      <House />
    </div>
  );
}

export default Skins;
