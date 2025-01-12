type statesType = "active" | "inactive" | "error";

export function Letter({
  active,
  word,
  wordIndex,
  char,
  charIndex,
  state,
}: {
  active: number[];
  word: string;
  wordIndex: number;
  char: string;
  charIndex: number;
  state: statesType;
}) {
  return active[0] === wordIndex && active[1] === charIndex ? (
    <span
      key={word + wordIndex + char + charIndex}
      className="flex items-center justify-center relative"
    >
      <span className="barra absolute left-0"></span>
      <span
        className={
          active[0] > wordIndex ||
          (active[0] === wordIndex && active[1] > charIndex)
            ? "text-white"
            : ""
        }
      >
        {char}
      </span>
    </span>
  ) : (
    <span
      key={word + wordIndex + char + charIndex}
      className={
        active[0] > wordIndex ||
        (active[0] === wordIndex && active[1] > charIndex)
          ? "text-white"
          : ""
      }
    >
      {char}
    </span>
  );
}
