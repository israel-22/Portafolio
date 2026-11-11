import "./displaySelector.css";
import { DISPLAY_PROFILES } from "../../data/displayProfiles";

export default function DisplaySelector({ selectedProfile, onChange }) {
  const profiles = Object.keys(DISPLAY_PROFILES);
  const currentIndex = profiles.indexOf(selectedProfile);

  const nextProfile = () => {
    const nextIndex = (currentIndex + 1) % profiles.length;
    onChange(profiles[nextIndex]);
  };

  return (
    <div className="robco-console__knob robco-color-selector">
      <span>COLOR</span>

      <button
        type="button"
        className="robco-console__dial robco-color-selector__dial"
        onClick={nextProfile}
        aria-label={`Cambiar color. Actual: ${DISPLAY_PROFILES[selectedProfile].label}`}
        title={`COLOR: ${DISPLAY_PROFILES[selectedProfile].label}`}
        style={{
          "--color-dial-rotation": `${currentIndex * 60}deg`,
        }}
      />

      <span className="robco-color-selector__value">
        {DISPLAY_PROFILES[selectedProfile].label}
      </span>
    </div>
  );
}
