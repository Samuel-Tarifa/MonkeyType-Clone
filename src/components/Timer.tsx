import { useEffect, useState } from "react";

export function Timer({ playing }: { playing: boolean }) {
  const initialTime = 30;
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setTime((cur) => {
        if (cur <= 0) {
          clearInterval(interval);
          return 0;
        }
        return cur - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [playing]);

  useEffect(() => {
    if (!playing) {
      setTime(initialTime);
    }
  }, [playing]);

  return (
    <h2
      className={`text-yellow text-5xl self-start ${
        !playing ? "opacity-0" : "block"
      }`}
    >
      {time}
    </h2>
  );
}
