// src/hooks/useTextToSpeech.js
import { useCallback } from "react";

function useTextToSpeech() {
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-AU";
    window.speechSynthesis.speak(utterance);
  }, []);

  return speak;
}

export default useTextToSpeech;
