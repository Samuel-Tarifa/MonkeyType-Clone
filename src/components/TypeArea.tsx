import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useText } from "../hooks/useText";
import { Letter } from "./Letter";
import { Timer } from "./Timer";

export function TypeArea() {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const textDisplay = useRef<HTMLDivElement>(null);

  const [playing,setPlaying]=useState(false)

  const resetText = () => {
    textArea.current?.focus();
    setPlaying(false)
  };

  const [text, handleButton, states, setStates, active, setActive] =
    useText(resetText);

  useEffect(() => {
    resetText();
    const handleBackSpace = () => {
      setActive((cur) => {
        if (cur[1] > 0) {
          setStates((state) => {
            const newState = [...state];
            newState[cur[0]] = [...newState[cur[0]]];
            newState[cur[0]][cur[1] - 1] = "inactive";
            return newState;
          });
          return [cur[0], cur[1] - 1];
        } else if (cur[0] > 0) {
          return [cur[0] - 1, text[cur[0] - 1].length];
        } else return [0, 0];
      });
    };
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Backspace") {
        handleBackSpace();
      }
    }
    const textareaNode = textArea.current;
    textareaNode?.addEventListener("keydown", onKeyDown);
    textareaNode?.focus();
    textDisplay.current?.addEventListener("click", () => textareaNode?.focus());
    return () => {
      textareaNode?.removeEventListener("keydown", onKeyDown);
    };
  }, [text, setStates, setActive]);

  const handleType = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const letter = e.target.value[e.target.value.length - 1];
    if (letter === "\n") return;

    setPlaying(true)

    const curWord = text[active[0]];

    // espacio
    if (letter === " ") {
      if (active[1] < curWord.length) {
        setStates((cur) => {
          const newState = [...cur];
          newState[active[0]] = [...newState[active[0]]];
          for (let i = active[1]; i < curWord.length; i++) {
            newState[active[0]][i] = "error";
          }
          return newState;
        });
      }
      setActive((cur) => [cur[0] + 1, 0]);
    }
    // tecla correcta
    else if (curWord[active[1]] === letter) {
      setStates((cur) => {
        const newState = [...cur];
        newState[active[0]][active[1]] = "active";
        return newState;
      });
      setActive((cur) => [cur[0], cur[1] + 1]);
    }
    // tecla incorrecta
    else if (curWord[active[1]] !== letter && active[1] < curWord.length) {
      setStates((cur) => {
        const newState = [...cur];
        newState[active[0]] = [...newState[active[0]]];
        newState[active[0]][active[1]] = "error";
        return newState;
      });
      setActive((cur) => [cur[0], cur[1] + 1]);
    }

    e.target.value = "";
  };

  return (
    <section className="h-full flex flex-col justify-around items-center relative w-[90%]">
      <div className="h-1/2 w-full">
        <Timer playing={playing} />
        <textarea
          name="typing"
          ref={textArea}
          id="typing"
          className="opacity-0 absolute"
          onChange={handleType}
        ></textarea>
        <div
          className="text-primary w-full font-[10] text-[2.3rem] leading-[2.3rem] max-h-40 overflow-hidden flex flex-wrap"
          ref={textDisplay}
        >
          {text.map((word, wordIndex) => (
            <div key={word + wordIndex} className={`word p-2 flex relative`}>
              {word.split("").map((char, charIndex) => (
                <Letter
                  key={word + wordIndex + char + charIndex}
                  active={active}
                  word={word}
                  wordIndex={wordIndex}
                  char={char}
                  charIndex={charIndex}
                  state={states[wordIndex][charIndex]}
                  playing={playing}
                />
              ))}
              {active[0] === wordIndex && active[1] === word.length && (
                <span className="barra absolute right-1"></span>
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
