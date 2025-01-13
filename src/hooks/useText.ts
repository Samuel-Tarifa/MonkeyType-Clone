import { useCallback, useEffect, useState } from "react";
import { texts } from "../texts";

type statesType = "active" | "inactive" | "error";

type ActiveType = [number, number];

export function useText(
  callback: () => void
): [
  string[],
  () => void,
  statesType[][],
  React.Dispatch<React.SetStateAction<statesType[][]>>,
  ActiveType,
  React.Dispatch<React.SetStateAction<ActiveType>>
] {
  const newText = () =>
    texts[Math.floor(Math.random() * texts.length)].split(" ");

  const generateInitialStates = useCallback(
    (text: string[]): statesType[][] =>
      text.map((word) => Array(word.length).fill("inactive")),
    []
  );

  const [text, setText] = useState(newText());
  const [states, setStates] = useState(() => generateInitialStates(text));
  const [active, setActive] = useState<ActiveType>([0, 0]);

  const handleButton = useCallback(() => {
    const newTextVal = newText();
    setText(newTextVal);
    setStates(generateInitialStates(newTextVal));
    setActive([0, 0]);
    callback();
  }, [callback, generateInitialStates]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") handleButton();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleButton]);

  return [text, handleButton, states, setStates, active, setActive];
}
