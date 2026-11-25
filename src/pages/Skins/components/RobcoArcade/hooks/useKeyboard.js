import { useEffect } from "react";

const KEY_CONTROLS = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "action1",
  a: "action2",
  s: "action3",
  d: "action4",
};

export default function useKeyboard({
  onMoveSelection,
  onStart,
  onBack,
  onControlDown,
  onControlUp,
  isGameActive = false,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;

      const isEditable =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
          target.getAttribute("role") === "slider");

      if (isEditable) return;

      const isInsideConsole = target.closest?.(".robco-console");

      if (
        !isInsideConsole &&
        target !== document.body &&
        target !== document.documentElement
      ) {
        return;
      }

      if (
        (event.key === "Enter" || event.key === " ") &&
        target.closest?.("button")
      ) {
        return;
      }

      if (isGameActive) {
        if (event.key === "Escape") {
          event.preventDefault();
          onBack?.();
          return;
        }

        const control =
          KEY_CONTROLS[event.key] || KEY_CONTROLS[event.key.toLowerCase()];

        if (control) {
          event.preventDefault();
          onControlDown?.(control);
        }

        if ((event.key === "Enter" || event.key === " ") && !event.repeat) {
          event.preventDefault();
          onControlDown?.("confirm");
        }

        return;
      }

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          onMoveSelection(-1);
          break;

        case "ArrowDown":
          event.preventDefault();
          onMoveSelection(1);
          break;

        case "Enter":
        case " ":
          if (event.repeat) return;
          event.preventDefault();
          onStart();
          break;

        case "Escape":
          if (onBack) {
            event.preventDefault();
            onBack();
          }
          break;

        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      const control =
        KEY_CONTROLS[event.key] || KEY_CONTROLS[event.key.toLowerCase()];

      if (control) {
        onControlUp?.(control);
      }

      if (event.key === "Enter" || event.key === " ") {
        onControlUp?.("confirm");
      }
    };

    const handleBlur = () => {
      if (onControlUp) {
        Object.values(KEY_CONTROLS).forEach(onControlUp);
        onControlUp("confirm");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [
    onMoveSelection,
    onStart,
    onBack,
    onControlDown,
    onControlUp,
    isGameActive,
  ]);
}
