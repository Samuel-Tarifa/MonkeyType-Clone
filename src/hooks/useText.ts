import { useCallback, useEffect, useState } from "react";
import { texts } from "../texts";

export function useText(callback: () => void): [string[], () => void] {
  const newText = () => texts[Math.floor(Math.random() * texts.length)].split(' ');

  const [text, setText] = useState(newText());

  const handleButton = useCallback(() => {
    setText(newText());
    callback();
  }, [callback]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      else handleButton();
      return;
    };

    window?.addEventListener("keydown", handleKeyDown);

    return () => {
      window?.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleButton]);

  return [text, handleButton];
}
