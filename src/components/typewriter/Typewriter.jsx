import { useState, useEffect } from "react";

function Typewriter({ text, speed = 20 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{text.slice(0, index)}</span>;
}

export default Typewriter;