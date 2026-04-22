import "./techCarousel.css";


function TechCarousel({ title, techs, reverse = false }) {
  
  // 👇 clave: repetir dinámicamente según cantidad
  const repeatCount = techs.length < 8 ? 6 : 3;

  const extendedTechs = Array(repeatCount)
    .fill(techs)
    .flat();

  return (
    <div className="tech-section">
      <h3>&gt; {title}</h3>

      <div className="tech-carousel">
        <div className={`tech-track ${reverse ? "reverse" : ""}`}>
          
          {extendedTechs.map((tech, index) => (
            <img key={index} src={tech} alt="tech" />
          ))}

        </div>
      </div>
    </div>
  );
}

export default TechCarousel;