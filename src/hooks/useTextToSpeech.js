import { useCallback } from "react";

function useTextToSpeech() {
  const speak = useCallback((text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-speech not supported.");
    }
  }, []);

  return speak;
}

export default useTextToSpeech;

