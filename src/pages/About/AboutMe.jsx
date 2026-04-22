import React from "react";
import { useState } from "react";
import IconPipboy from "../../components/iconPipBoy/IconPipboy.jsx";
import Typewriter from "../../components/typewriter/Typewriter.jsx";
import "./aboutMe.css";
import Certifications from "./Certifications.jsx";
import TechCarousel from "./TechCarousel.jsx";

/*-------------------------- ICONS----------------------------------- */
import S from "../../assets/icons/FO76_S.webp";
import P from "../../assets/icons/FO76_P.webp";
import E from "../../assets/icons/FO76_E.webp";
import C from "../../assets/icons/FO76_C.webp";
import I from "../../assets/icons/FO76_I.webp";
import A from "../../assets/icons/FO76_A.webp";
import L from "../../assets/icons/FO76_L.webp";
import SignalIcon from "../../assets/icons/FO4_Vault-Tec_logo.webp";
import Character from "../../assets/icons/FO76_character.webp";
import Selfie from "../../assets/icons/FO76_menusprite_photogallery.webp";
import Personal from "../../assets/icons/personal.png";
import Strenght from "../../assets/icons/FO76_vaultboy_strength.webp";
import Perception from "../../assets/icons/FO76_vaultboy_perception.webp";
import Endurance from "../../assets/icons/FO76_vaultboy_endurance.webp";
import Charisma from "../../assets/icons/FO76_vaultboy_charisma.webp";
import Intelligence from "../../assets/icons/FO76_vaultboy_intelligence.webp";
import Agility from "../../assets/icons/FO76_vaultboy_agility.webp";
import Luck from "../../assets/icons/FO76_vaultboy_luck.webp";
/*logos especialidades */
import Angular from "../../assets/icons/angular.webp";
import Bootstrap from "../../assets/icons/boostrap.jpeg";
import Springboot from "../../assets/icons/boot.png";
import Csharp from "../../assets/icons/csharp.png";
import Cplus from "../../assets/icons/cplus.png";
import Css from "../../assets/icons/css.png";
import Dart from "../../assets/icons/dart.png";
import Expo from "../../assets/icons/expo.png";
import Firebase from "../../assets/icons/firebace.png";
import Flutter from "../../assets/icons/flutter.jpg";
import HTML from "../../assets/icons/html.png";
import Java from "../../assets/icons/java.svg";
import Javascript from "../../assets/icons/js.png";
import  Linux from "../../assets/icons/linux.jpg";
import Node from "../../assets/icons/nodejs.jpg";
import Nosql from "../../assets/icons/nosql.svg";
import Python from "../../assets/icons/python.png";
import Reac from "../../assets/icons/react.webp";
import SQL from "../../assets/icons/sql.png";
import Typescript from "../../assets/icons/ts.webp";
import Tailwind from "../../assets/icons/tailwind.png";
import Workbench from "../../assets/icons/mysql_workbench.png";
import Git from "../../assets/icons/git.png";
import Github from "../../assets/icons/github.png";


 

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
      desc: "Fast adaptation to new technologies and frameworks such as React, React Native, Flutter, Angular, Bootstrap, Tailwind, MongoDB, SQL, Spring Boot, Node.js, and Firebase. Able to integrate into different development environments efficiently.",
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


  const techDominadas = [
 
  SignalIcon ,
  Character,
  Angular,
  Bootstrap,
  Springboot,
  Css,
  Expo,
  Firebase,
  HTML,
  Java,
  Javascript,
   Linux,
  Node,
  Nosql,
  Python,
  Reac,
  SQL,
  Typescript,
  Tailwind,
  Workbench,
  Git,
  Github,
  

];

  const techLearning = [
      Flutter,
    Dart,
  Csharp,
  Cplus,
  Selfie,
  SignalIcon ,
  ];
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
                    &gt;{" "}
                    <Typewriter
                      key={currentStat.key}
                      text={currentStat.title}
                    />
                    <span className="cursor">_</span>
                  </h2>

                  <p>
                    <Typewriter
                      key={currentStat.key + "-desc"}
                      text={currentStat.desc}
                      speed={10}
                    />
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

        {/* SECCIÓN 2: CERTIFICACIONES */}
        <Certifications />

        {/* SECCIÓN 3: TECH */}
        <section className="about-tech">
          <TechCarousel title="DOMINATED TECH" techs={techDominadas} />

          <TechCarousel
            title="LEARNING TECH"
            techs={techLearning}
            reverse={true}
          />
        </section>
      </div>
    </div>
  );
}
export default About;
