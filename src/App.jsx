import React from "react";  
import {ReactTyped} from "react-typed";
import Terminal from "react-terminal-ui";
import "./crt.css";

function App(){
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="crt w-full max-w-2xl">
        {/*Texto animado */}
        <h1 className="text-3xl mb-4">
          <ReactTyped
          strings={[
            ">.",
            ">..",
            ">...",
            ">..",
            ">.",
            "> Bienvenido al sistema de terminal interactivo...",
            "> Cargando modulos...",
            "> Acceso concedido...",
          ]}
          typeSpeed={40}
          backSpeed={20}
          loop
          />
        </h1>
        {/* Terminal*/}
        <Terminal
        name="Pip-Boy 3000"
        height="300px"
        colorMode="dark"
        lineData={[
          { type: 'input', value: '> mostrar info' },
          { type: 'output',value: '> Nombre: Israel Santos'},
          { type: 'output',value: '> Rol: Desarrollador Full Stack'},
          { type: 'output',value: '> Estado del sistema: Operativo Oki Doki!!'},
          { type: 'output',value: '> Desarrollador full stack con experiencia en React, Node.js y bases de datos. Apasionado por crear aplicaciones web eficientes y escalables.'},
        ]}
        />

      </div>
      
    </div>
  );
}

export default App;