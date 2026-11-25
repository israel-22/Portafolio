
import { useCallback, useRef } from "react";

export default function useGameControls() {
  const pressedControls = useRef(new Set());

  const pressControl = useCallback((control) => {
    if (pressedControls.current.has(control)) return;

    pressedControls.current.add(control);
  }, []);

  const releaseControl = useCallback((control) => {
    pressedControls.current.delete(control);
  }, []);

  const releaseAllControls = useCallback(() => {
    pressedControls.current.clear();
  }, []);

  const getPressedControls = useCallback(() => {
    return [...pressedControls.current];
  }, []);

  return {
    pressControl,
    releaseControl,
    releaseAllControls,
    getPressedControls,
  };
}
