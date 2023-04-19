//https://stackoverflow.com/questions/23483990/speechsynthesis-api-onend-callback-not-working
const ensureItWorksNotOnlyInChrome = (x: unknown) => {
  if (!navigator.userAgent.includes("Chrome/")) {
    (window as any).saveFromGC = x;
  }
};

export function speakText(
  text: string,
  onStart?: (e: SpeechSynthesisEvent) => void
): Promise<void> {
  return new Promise<void>((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);

    ensureItWorksNotOnlyInChrome(utterance);

    if (onStart) {
      utterance.onstart = onStart;
    }

    utterance.onend = () => {
      delete (window as any).saveFromGC;
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
