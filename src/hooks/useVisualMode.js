import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace === true) {
      setMode(mode);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  }

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      history.pop();
    } else {
      setMode(initial);
    }
  }

  return { mode, transition, back };
}
