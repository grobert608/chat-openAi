export async function speakText(
  text: string,
  onStart?: (e: SpeechSynthesisEvent) => void
) {
  return new Promise<void>((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (onStart) {
      utterance.onstart = (event) => onStart(event);
    }

    utterance.onend = (event) => {
      resolve();
    };

    utterance.onerror = (event) => {
      console.log("speechSynthesis error", event);
      speechSynthesis.cancel();
      resolve();
    };
    speechSynthesis.speak(utterance);
  });
}
