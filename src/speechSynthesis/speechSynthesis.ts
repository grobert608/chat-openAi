export function speakText(
  text: string,
  onStart?: (e: SpeechSynthesisEvent) => void,
  onEnd?: (e: SpeechSynthesisEvent) => void
) {
  const utterance = new SpeechSynthesisUtterance(text);
  if (onStart) {
    utterance.onstart = (event) => onStart(event);
  }
  if (onEnd) {
    utterance.onend = (event) => onEnd(event);
  }
  utterance.onerror = (event) => {
    console.log("speechSynthesis error", event);
    speechSynthesis.cancel();
    speakText("Sorry!");
  };
  speechSynthesis.speak(utterance);
}
