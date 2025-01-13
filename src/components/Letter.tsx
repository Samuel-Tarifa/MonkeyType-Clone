type statesType = "active" | "inactive" | "error";

export function Letter({
  active,
  word,
  wordIndex,
  char,
  charIndex,
  state,
  playing,
}: {
  active: number[];
  word: string;
  wordIndex: number;
  char: string;
  charIndex: number;
  state: statesType;
  playing: boolean;
}) {
  const color = {
    active: "text-white",
    inactive: "text-primary",
    error: "text-red",
  };
  const key = word + wordIndex + char + charIndex;
  return active[0] === wordIndex && active[1] === charIndex ? (
    <span key={key} className="flex items-center justify-center relative">
      <span
        className={`barra absolute left-0 ${!playing ? "blink" : ""}`}
      ></span>
      <span className={color[state]}>{char}</span>
    </span>
  ) : (
    <span key={key} className={color[state]}>
      {char}
    </span>
  );
}
