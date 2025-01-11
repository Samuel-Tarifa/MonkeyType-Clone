import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useText } from "../hooks/useText";

export function TypeArea() {
  const textArea = useRef<HTMLTextAreaElement>(null);

  const resetText = () => {
    setActive([0, 0]);
    textArea.current?.focus();
  };

  const [text, handleButton] = useText(resetText);

  useEffect(() => {
    resetText();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Backspace") {
        setActive((cur) => {
          if (cur[1] > 0) {
            return [cur[0], cur[1] - 1];
          } else if (cur[0] > 0) {
            return [cur[0] - 1, text[cur[0] - 1].length];
          } else return [0, 0];
        });
      }
    }
    textArea.current?.addEventListener("keydown", onKeyDown);
  }, [text]);

  const [active, setActive] = useState([0, 0]);

  const handleType = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const letter = e.target.value[e.target.value.length - 1];
    const curWord = text[active[0]];
    if (letter === " " && active[1] === curWord.length) {
      setActive((cur) => [cur[0] + 1, 0]);
    }
    if (curWord[active[1]] === letter) {
      setActive((cur) => [cur[0], cur[1] + 1]);
    }
    e.target.value = "";
  };

  return (
    <section className="h-full flex flex-col justify-around items-center relative mt-32 w-[90%]">
      <div className="h-1/2 w-full">
        <textarea
          name="typing"
          ref={textArea}
          id="typing"
          className="w-full h-[60%] z-1 opacity-0 absolute"
          onChange={handleType}
        ></textarea>
        <div className="text-primary w-full font-[10] text-[2.3rem] leading-[2.3rem] max-h-40 overflow-hidden flex flex-wrap">
          {text.map((word, index) => (
            <div key={word + index} className={`word p-2 flex`}>
              {word.split("").map((char, i) =>
                active[0] === index && active[1] === i ? (
                  <span
                    key={word + index + char + i}
                    className="flex items-center justify-center relative"
                  >
                    <span className="barra absolute left-0"></span>
                    <span
                      className={
                        active[0] > index ||
                        (active[0] === index && active[1] > i)
                          ? "text-white"
                          : ""
                      }
                    >
                      {char}
                    </span>
                  </span>
                ) : (
                  <span
                    key={word + index + char + i}
                    className={
                      active[0] > index ||
                      (active[0] === index && active[1] > i)
                        ? "text-white"
                        : ""
                    }
                  >
                    {char}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleButton}
        className="bg-secondary text-primary z-10 p-2 rounded-lg newText"
      >
        <span className="bg-primary text-background rounded-sm h-[0.7rem] px-[0.3rem] py-[0rem]">
          enter
        </span>{" "}
        - Restart test
      </button>
    </section>
  );
}
