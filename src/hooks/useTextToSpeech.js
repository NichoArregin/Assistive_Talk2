import { useCallback } from "react";

const useTextToSpeech = () => {
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-AU"; // or "en-US" based on preference
    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
};

export default useTextToSpeech;
