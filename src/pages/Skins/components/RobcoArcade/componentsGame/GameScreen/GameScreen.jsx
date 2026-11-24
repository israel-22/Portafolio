
import "./gameScreen.css";
import ArcadeMenu from "../ArcadeMenu/ArcadeMenu";

export default function GameScreen({
  selectedGame,
  onSelect,
  onStart,
}) {
  return (
    <div className="robco-console__screen">
      <ArcadeMenu
        selectedGame={selectedGame}
        onSelect={onSelect}
        onStart={onStart}
      />
    </div>
  );
}
