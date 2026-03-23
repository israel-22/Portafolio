import React from "react";

import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";
import "./aboutMe.css";

import S from "../../assets/icons/FO76_S.webp";
import P from "../../assets/icons/FO76_P.webp";
import E from "../../assets/icons/FO76_E.webp";
import C from "../../assets/icons/FO76_C.webp";
import I from "../../assets/icons/FO76_I.webp";
import A from "../../assets/icons/FO76_A.webp";
import L from "../../assets/icons/FO76_L.webp";
/*import signalIcon from "../../assets/icons/FO4_Vault-Tec_logo.webp";*/
import Character from "../../assets/icons/FO76_character.webp";
import Selfie from "../../assets/icons/FO76_menusprite_photogallery.webp";

function About() {
  return (
    <div className="about-container">
      <div className="about-frame">
        {/* HEADER */}
        <header className="about-header">
          <h1>C:\\ ABOUT_ME</h1>

          <div className="about-header-content">
            {/* IZQUIERDA */}
            <div className="about-header-text">
              <span>&gt; NAME: Santos Israel</span>
              <span>&gt; AGE: 30 years </span>
              <span>&gt; GENDER: Male </span>
              <span>&gt; ROLE: Junior Developer</span>
              <span>&gt; NATIONALITY: Ecuadorian </span>  
              <p className="terminal-muted">
                / Software Development Technologist
              </p>
            </div>

            {/* DERECHA */}
            <div className="about-header-right">

              <div className="about-header-photo">
                <IconPipboy src={Selfie} alt="Profile" />
              </div>

              
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <section className="special-stats">
          <div className="special-row">
            <IconPipboy src={S} alt="Strength" />
            <h3>&gt; STRENGTH</h3>
          </div>

          <div className="special-row">
            <IconPipboy src={P} alt="Perception" />
            <h3>&gt; PERCEPTION</h3>
          </div>

          <div className="special-row">
            <IconPipboy src={E} alt="Endurance" />
            <h3>&gt; ENDURANCE</h3>
          </div>

          <div className="special-row">
            <IconPipboy src={C} alt="Charisma" />
            <h3>&gt; CHARISMA</h3>
          </div>

          <div className="special-row">
            <IconPipboy src={I} alt="Intelligence" />
            <h3>&gt; INTELLIGENCE</h3>
          </div>

          <div className="special-row">
            <IconPipboy src={A} alt="Agility" />
            <h3>&gt; AGILITY</h3>
          </div>

          <div className="special-row">
            <IconPipboy src={L} alt="Luck" />
            <h3>&gt; LUCK</h3>
          </div>

          {/* PANEL INFO */}
          <div className="special-display">
            <div>
              <h2>&gt; Select a SPECIAL attribute</h2>

              <p>
                Each attribute represents a personal strength in my development
                journey.
              </p>

              <p>
                NOTA ANCELMO_ cambiar la imagen del header por una foto tuya
                , terminar de colocar las imagenes y los contenidos SPECIAL eso es importante
              </p>

              <p>Select one to display more information.</p>
            </div>

            <div className="special-image-card">
              <IconPipboy src={Character} alt="Vault Boy" />
            </div>
          </div>
        </section>

        {/* TECH CAROUSELS */}
        <section className="about-tech">
          <div className="tech-dominant"></div>
          <div className="tech-learning"></div>
        </section>
      </div>
    </div>
  );
}
export default About;
