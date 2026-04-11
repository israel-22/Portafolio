import React from "react";
import { useState } from "react";
import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";
import Typewriter from "../../components/typewriter/Typewriter.jsx";
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
/*import Selfie from "../../assets/icons/FO76_menusprite_photogallery.webp";*/
import Personal from "../../assets/icons/personal.png";
import Strenght from "../../assets/icons/FO76_vaultboy_strength.webp";
import Perception from "../../assets/icons/FO76_vaultboy_perception.webp";
import Endurance from "../../assets/icons/FO76_vaultboy_endurance.webp";
import Charisma from "../../assets/icons/FO76_vaultboy_charisma.webp";
import Intelligence from "../../assets/icons/FO76_vaultboy_intelligence.webp";
import Agility from "../../assets/icons/FO76_vaultboy_agility.webp";
import Luck from "../../assets/icons/FO76_vaultboy_luck.webp";

function About() {
  const [selectedStat, setSelectedStat] = useState("S");

  const specialData = [
  {
    key: "S",
    title: "STRENGTH",
    desc: "I develop complete web and mobile solutions, integrating logic, interface, and data. I tackle real-world problems and turn them into functional applications, prioritizing performance and code clarity.",
    img: Strenght,
    level: 8,
  },
  {
    key: "P",
    title: "PERCEPTION",
    desc: "High precision in debugging and interface development. I quickly identify issues and optimize details that directly impact user experience and system stability.",
    img: Perception,
    level: 8,
  },
  {
    key: "E",
    title: "ENDURANCE",
    desc: "Proven consistency: I balance studying, development, and technical work simultaneously. I maintain discipline in long-term projects without losing focus, even under pressure.",
    img: Endurance,
    level: 9,
  },
  {
    key: "C",
    title: "CHARISMA",
    desc: "Clear technical communication with users and teams. I translate real-world problems into understandable and executable digital solutions within development environments.",
    img: Charisma,
    level: 7,
  },
  {
    key: "I",
    title: "INTELLIGENCE",
    desc: "Strong foundation in software development with multiple technologies: JavaScript, TypeScript, Java, Python, and C#. Continuously improving with a practical, hands-on approach to real applications.",
    img: Intelligence,
    level: 9,
  },
  {
    key: "A",
    title: "AGILITY",
    desc: "Fast adaptation to new technologies and frameworks such as React, React Native, Flutter, and Firebase. Able to integrate into different development environments efficiently.",
    img: Agility,
    level: 8,
  },
  {
    key: "L",
    title: "LUCK",
    desc: "Growth mindset focused on continuous improvement. I learn from mistakes, iterate quickly, and turn every experience into an opportunity to optimize results.",
    img: Luck,
    level: 8,
  },
];

  const iconMap = { S, P, E, C, I, A, L };

  const currentStat = specialData.find((s) => s.key === selectedStat);

  {
    specialData.map((stat) => (
      <div
        key={stat.key}
        className={`special-row ${selectedStat === stat.key ? "active" : ""}`}
        onClick={() => setSelectedStat(stat.key)}
      >
        <IconPipboy src={iconMap[stat.key]} alt={stat.title} />
        <h3>&gt; {stat.title}</h3>
      </div>
    ));
  }
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
                <IconPipboy src={Personal} alt="personal" />
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <section className="special-stats">
          <p className="special-instruction">
            &gt; Select a SPECIAL attribute to explore my profile
          </p>

          {/* LISTA */}
          {specialData.map((stat) => (
            <div
              key={stat.key}
              className={`special-row ${selectedStat === stat.key ? "active" : ""}`}
              onClick={() => setSelectedStat(stat.key)}
              onMouseEnter={() => setSelectedStat(stat.key)}
            >
              <IconPipboy src={iconMap[stat.key]} alt={stat.title} />
              <h3>&gt; {stat.title}</h3>
            </div>
          ))}

          {/* PANEL */}
          {currentStat && (
            <>
              <div className="special-display">
                <div>
                  <h2>
                    &gt; <Typewriter key={currentStat.key} text={currentStat.title} />
                    <span className="cursor">_</span>
                  </h2>

                  <p>
                    <Typewriter key={currentStat.key + "-desc"} text={currentStat.desc} speed={10} />
                  </p>
                  <p>&gt; LEVEL: {currentStat.level}/10</p>
                </div>

                <div className="special-image-card">
                  <IconPipboy src={currentStat.img} alt="Vault Boy" />
                </div>
              </div>

              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${currentStat.level * 10}%` }}
                ></div>
              </div>
            </>
          )}
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
