import { useEffect, useRef, useState } from "react";
import "./robcoRadio.css";
import "./radio.effect";
import RobCoLogo from "../../../../assets/icons/RobCo_MDBP.webp";

const audioFiles = import.meta.glob("../../../assets/radio/*/*.{mp3,ogg,wav}", {
  eager: true,
  query: "?url",
  import: "default",
});

function getStations() {
  const stations = {};

  Object.entries(audioFiles).forEach(([path, url]) => {
    const parts = path.split("/");

    const stationName = parts[parts.length - 2];

    if (!stations[stationName]) {
      stations[stationName] = [];
    }

    stations[stationName].push(url);
  });

  return stations;
}

function RobcoRadio() {
  const stations = getStations();

  const stationNames = Object.keys(stations);

  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  const [stationIndex, setStationIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [phosphor, setPhosphor] = useState("green");

  const [signal, setSignal] = useState(new Array(10).fill(0));

  const currentStation = stationNames[stationIndex] || "station01";

  const currentTracks = stations[currentStation] || [];

  const currentTrack = currentTracks[trackIndex];

  /*
   * AUDIO
   */

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    audioRef.current.src = currentTrack;
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrack]);

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

      analyser.fftSize = 128;

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

  const updateVisualizer = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      const bars = [];

      for (let i = 0; i < 10; i++) {
        const index = Math.floor(i * (dataArray.length / 10));

        bars.push(dataArray[index] || 0);
      }

      setSignal(bars);

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
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
    if (!stationNames.length) return;

    setStationIndex(
      (previous) =>
        (previous + direction + stationNames.length) % stationNames.length,
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
    <section className={`robco-radio phosphor-${phosphor}`}>
      <audio ref={audioRef} onEnded={nextTrack} />

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
                {signal.map((value, index) => (
                  <div
                    key={index}
                    className="signal-bar"
                    style={{
                      height: `${Math.max(4, value * 0.8)}%`,
                    }}
                  />
                ))}
              </div>

              <div className="signal-info">
                <div>
                  <strong>98.7</strong> MHz
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

              <div className="station-name">ROBCO CLASSICS</div>

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

            <div className="tuning-dial">
              <div className="dial-marker" />

              <div className="dial-center" />
            </div>

            <div className="frequency-scale">
              <span>88</span>
              <span>92</span>
              <span>96</span>
              <span>102</span>
              <span>106</span>
              <span>108</span>
            </div>
          </section>

          <div className="frequency-display">
            <strong>98.7</strong>

            <span>MHz</span>
          </div>

          <section className="station-display">
            <h3>STATION</h3>

            <div className="station-screen">{currentStation.toUpperCase()}</div>
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

          <div className="knob">
            <div className="knob-marker" />
          </div>
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
          <h3>TUNING</h3>

          <div className="knob">
            <div className="knob-marker" />
          </div>
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
