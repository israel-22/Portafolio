import { useEffect, useRef, useState } from "react";
import "./robcoRadio.css";
import RobCoLogo from "../../../../assets/icons/RobCo_MDBP.webp";
import radioStations from "../../../../data/radio.json";

const audioFiles = import.meta.glob(
  "../../../../assets/radio/*/*.{mp3,ogg,wav}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const audioFilesByPath = Object.fromEntries(
  Object.entries(audioFiles).map(([path, url]) => [
    path.split("/radio/").pop(),
    url,
  ]),
);

const stations = radioStations.map((station) => ({
  ...station,
  tracks: station.tracks
    .map((path) => {
      const audioUrl = audioFilesByPath[path];

      if (!audioUrl) {
        console.warn(`No se encontró la canción: ${path}`);
      }

      return audioUrl;
    })
    .filter(Boolean),
}));

function RobcoRadio() {
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const waveformHistoryRef = useRef([]);

  const [stationIndex, setStationIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [phosphor, setPhosphor] = useState("green");
  const [signal, setSignal] = useState(new Array(10).fill(0));
  const [volume, setVolume] = useState(70);
  const [brightness, setBrightness] = useState(100);

  const currentStation = stations[stationIndex];
  const currentTracks = currentStation?.tracks ?? [];
  const currentTrack = currentTracks[trackIndex];

  /*
   * AUDIO
   */

  // Carga la canción cuando cambia la pista.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentTrack) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      return;
    }

    audio.src = currentTrack;
    audio.load();
  }, [currentTrack]);

  // Reproduce o pausa según el estado de la radio.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("No se pudo reproducir la canción:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Sincroniza la perilla con el volumen real del reproductor.
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume / 100;
  }, [volume]);

  /*
   * WEB AUDIO API
   */

  const initializeAudio = () => {
    if (!audioRef.current) return;

    if (!analyserRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;

      const audioContext = new AudioContext();

      const source = audioContext.createMediaElementSource(audioRef.current);

      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 2048;

      source.connect(analyser);

      analyser.connect(audioContext.destination);

      analyserRef.current = analyser;

      updateVisualizer();
    }

    if (analyserRef.current.context.state === "suspended") {
      analyserRef.current.context.resume();
    }
  };

  /*
   * VISUALIZER
   */

  // Actualiza el visualizador de audio.
  const updateVisualizer = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const timeData = new Uint8Array(analyser.fftSize);
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      if (!canvasRef.current || !analyserRef.current) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      if (!width || !height) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Leer la señal actual del audio.
      analyser.getByteTimeDomainData(timeData);

      const phosphorColor = getComputedStyle(canvas).color || "#8cff38";
      const history = waveformHistoryRef.current;

      // Guardar una copia independiente de cada fotograma.
      history.unshift(timeData.slice());

      if (history.length > 13) {
        history.length = 13;
      }

      const centerY = height / 2;
      const amplitude = height * 0.42;

      const drawWave = (data, opacity, lineWidth, glow) => {
        if (!data) return;

        ctx.beginPath();
        ctx.globalAlpha = opacity;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = phosphorColor;
        ctx.shadowColor = phosphorColor;
        
        ctx.shadowBlur = glow;

        for (let i = 0; i < data.length; i++) {
          const normalized = (data[i] - 128) / 128;
          const x = (i / (data.length - 1)) * width;
          const y = centerY + normalized * amplitude;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      };

      // Persistencia del fósforo: rastros anteriores.
      drawWave(history[12], 0.10, 1, 3);
      drawWave(history[8], 0.16, 1.2, 4);
      drawWave(history[4], 0.25, 1.4, 6);

      // Señal actual, más brillante.
      drawWave(timeData, 1, 1.8, 12);

      // Restablecer los efectos gráficos.
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // Actualizar el medidor de señal existente.
      analyser.getByteFrequencyData(frequencyData);

      const bars = [];

      for (let i = 0; i < 10; i++) {
        const index = Math.floor(i * (frequencyData.length / 10));
        bars.push(frequencyData[index] || 0);
      }

      setSignal(bars);

      // Continuar la animación.
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };


   

  /*
 * PHYSICAL KNOBS
 */

// Convierte la posición horizontal en un valor de 0 a 100.
const updateKnob = (event, setter) => {
  const rect = event.currentTarget.getBoundingClientRect();

  const position = (event.clientX - rect.left) / rect.width;
  const value = Math.round(position * 100);

  setter(Math.max(0, Math.min(100, value)));
};

// Permite controlar las perillas con el teclado.
const handleKnobKeyDown = (event, value, setter) => {
  let nextValue = value;

  switch (event.key) {
    case "ArrowRight":
    case "ArrowUp":
      nextValue = Math.min(100, value + 2);
      break;

    case "ArrowLeft":
    case "ArrowDown":
      nextValue = Math.max(0, value - 2);
      break;

    case "Home":
      nextValue = 0;
      break;

    case "End":
      nextValue = 100;
      break;

    default:
      return;
  }

  event.preventDefault();
  setter(nextValue);
};

  /*
   * PLAY / PAUSE
   */

  const togglePlay = async () => {
    if (!audioRef.current || !currentTrack) {
      return;
    }

    initializeAudio();

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to play audio:", error);
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  /*
   * NEXT TRACK
   */

  const nextTrack = () => {
    if (!currentTracks.length) return;

    setTrackIndex((previous) => (previous + 1) % currentTracks.length);
  };

  /*
   * PREVIOUS TRACK
   */

  const previousTrack = () => {
    if (!currentTracks.length) return;

    setTrackIndex(
      (previous) =>
        (previous - 1 + currentTracks.length) % currentTracks.length,
    );
  };

  /*
   * CHANGE STATION
   */

  const changeStation = (direction) => {
    if (!stations.length) return;

    setStationIndex(
      (previous) => (previous + direction + stations.length) % stations.length,
    );

    setTrackIndex(0);
  };

  /*
   * CLEANUP
   */

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className={`robco-radio phosphor-${phosphor}`} style={{
    "--radio-brightness": brightness / 100,
  }}>
      <audio
        ref={audioRef}
        onEnded={() => {
          if (currentTracks.length > 1) {
            nextTrack();
          } else {
            setIsPlaying(false);
            setSignal(new Array(10).fill(0));
          }
        }}
      />

      {/* HEADER */}

      <header className="radio-header">
        <span className="radio-brand">EDITION 1972</span>
        <h2>ROBCO RADIO NETWORK</h2>

        <span className="radio-brand">MDBP-01</span>
      </header>

      {/* MAIN */}

      <div className="radio-main">
        {/* CRT */}

        <div className="crt-frame">
          <div className="crt-screen">
            <div className="crt-grid" />

            <div className="signal-display">
              <span className="signal-title">AUDIO SIGNAL</span>

              {/* REAL AUDIO VISUALIZER */}

              <div className="audio-visualizer">
                <canvas
                  ref={canvasRef}
                  className="audio-waveform"
                  aria-label="Osciloscopio de audio"
                />
              </div>

              <div className="signal-info">
                <div>
                  <strong>{currentStation?.frequency ?? "--.-"}</strong> MHz
                </div>
                <div className="signal-meter">
                  SIGNAL
                  <div className="meter">
                    {signal.map((value, index) => (
                      <i key={index} className={value < 40 ? "inactive" : ""} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="station-name">
                {currentStation?.name ?? "SIN SEÑAL"}
              </div>

              <div className="radio-status-text">
                {isPlaying ? "TRANSMITTING" : "STANDBY"}
              </div>
            </div>

            <div className="crt-noise" />

            <div className="crt-scanlines" />
          </div>
        </div>

        {/* SIDE PANEL */}

        <aside className="radio-side">
          <section className="radio-control">
            <h3>TUNING</h3>

            <div
              className="tuning-dial"
              role="button"
              tabIndex={0}
              aria-label={`Cambiar emisora. Actual: ${currentStation?.name ?? "Sin señal"}`}
              style={{
                "--dial-angle": `${
                  stationIndex * (360 / Math.max(stations.length, 1))
                }deg`,
              }}
              onClick={() => changeStation(1)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  changeStation(1);
                }
              }}
            >
              <div className="dial-marker" />
              <div className="dial-center" />
            </div>

            <div className="station-tuning-controls">
              <button
                type="button"
                onClick={() => changeStation(-1)}
                aria-label="Emisora anterior"
              >
                ◀
              </button>

              <button
                type="button"
                onClick={() => changeStation(1)}
                aria-label="Emisora siguiente"
              >
                ▶
              </button>
            </div>

            <div className="frequency-scale">
              {stations.map((station, index) => (
                <button
                  key={station.id}
                  type="button"
                  className={
                    index === stationIndex
                      ? "frequency-mark active"
                      : "frequency-mark"
                  }
                  onClick={() => {
                    setStationIndex(index);
                    setTrackIndex(0);
                  }}
                  aria-label={`Sintonizar ${station.name}, ${station.frequency} MHz`}
                  aria-pressed={index === stationIndex}
                >
                  {station.frequency}
                </button>
              ))}
            </div>
          </section>

          <div className="frequency-display">
            <strong>{currentStation?.frequency ?? "--.-"}</strong>
            <span>MHz</span>
          </div>

          <section className="station-display">
            <h3>STATION</h3>

            <div className="station-screen">
              {currentStation?.name ?? "SIN SEÑAL"}
            </div>
          </section>

          {/* PHOSPHOR */}

          <section className="phosphor-control">
            <h3>PHOSPHOR</h3>

            <div className="phosphor-buttons">
              <button
                type="button"
                className={phosphor === "green" ? "active" : ""}
                onClick={() => setPhosphor("green")}
              >
                G
              </button>

              <button
                type="button"
                className={phosphor === "amber" ? "active" : ""}
                onClick={() => setPhosphor("amber")}
              >
                A
              </button>

              <button
                type="button"
                className={phosphor === "blue" ? "active" : ""}
                onClick={() => setPhosphor("blue")}
              >
                B
              </button>

              <button
                type="button"
                className={phosphor === "red" ? "active" : ""}
                onClick={() => setPhosphor("red")}
              >
                R
              </button>

              <button
                type="button"
                className={phosphor === "purple" ? "active" : ""}
                onClick={() => setPhosphor("purple")}
              >
                P
              </button>

              <button
                type="button"
                className={phosphor === "cyan" ? "active" : ""}
                onClick={() => setPhosphor("cyan")}
              >
                C
              </button>
            </div>
          </section>
        </aside>
      </div>

      {/* CONTROLS */}

      <div className="radio-controls">
        <section className="knob-section">
  <h3>VOLUME</h3>

  <div
    className="knob"
    role="slider"
    tabIndex={0}
    aria-label="Volumen de audio"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={volume}
    aria-valuetext={`${volume}%`}
    style={{
      "--knob-angle": `${-135 + volume * 2.7}deg`,
    }}
    onPointerDown={(event) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      updateKnob(event, setVolume);
    }}
    onPointerMove={(event) => {
      if (event.buttons === 1) {
        updateKnob(event, setVolume);
      }
    }}
    onKeyDown={(event) =>
      handleKnobKeyDown(event, volume, setVolume)
    }
  >
    <div className="knob-marker" />
  </div>

  <output className="knob-value">{volume}%</output>
</section>

        <section className="player-controls">
          <button type="button" onClick={previousTrack}>
            ◀◀
          </button>

          <button type="button" className="play-button" onClick={togglePlay}>
            <span className={`status-light ${isPlaying ? "active" : ""}`} />

            {isPlaying ? "PAUSE" : "PLAY"}
          </button>

          <button type="button" onClick={nextTrack}>
            ▶▶
          </button>
        </section>

        <section className="knob-section">
  <h3>BRIGHTNESS</h3>

  <div
    className="knob"
    role="slider"
    tabIndex={0}
    aria-label="Brillo de la pantalla"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={brightness}
    aria-valuetext={`${brightness}%`}
    style={{
      "--knob-angle": `${-135 + brightness * 2.7}deg`,
    }}
    onPointerDown={(event) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      updateKnob(event, setBrightness);
    }}
    onPointerMove={(event) => {
      if (event.buttons === 1) {
        updateKnob(event, setBrightness);
      }
    }}
    onKeyDown={(event) =>
      handleKnobKeyDown(event, brightness, setBrightness)
    }
  >
    <div className="knob-marker" />
  </div>

  <output className="knob-value">{brightness}%</output>
</section>
<section className="speaker">
    <div className="speaker-logo">&reg; RobCo</div>
  </section>
       
      </div>

      {/* FOOTER */}

      
<footer className="radio-footer">
  

  <span className="radio-phosphor">
    PHOSPHOR: {phosphor.toUpperCase()}
  </span>

  <img
    src={RobCoLogo}
    alt="RobCo Industries"
    className="robco-radio-logo"
  />

  <span className="radio-status">
    STATUS:
    <span className="radio-status-value">
      {isPlaying ? "ONLINE" : "STANDBY"}
    </span>
    <span className={`status-led ${isPlaying ? "active" : ""}`} />
  </span>
 
</footer>

    </section>
  );
}

export default RobcoRadio;
