import { observer } from "mobx-react";
import React, { useCallback } from "react";
import { Animation } from "../domain/animation";
import { Sender } from "../domain/message";
import { useStores } from "../hooks/useStores";
import { useOpenAi } from "../open-ai/openAi";
import { speakText } from "../speechSynthesis/speechSynthesis";

export const Chat: React.FC = observer(function Chat() {
  const { historyStore, openAiStore, animationStore } = useStores();
  const { loading, requestWasSent, responseWasReceived } = openAiStore;
  const { historyFormatted, addMessage } = historyStore;

  const openAi: (history: string, question: string) => Promise<string | Error> =
    useOpenAi();

  const buttonCallback = useCallback(async () => {
    requestWasSent();
    const question: string = historyStore.message;
    const response = await openAi(historyFormatted, question);
    let speechText = "Sorry, something went wrong! Try again later.";
    let animation = Animation.No;
    if (!(response instanceof Error)) {
      addMessage(
        {
          sender: Sender.Human,
          text: question,
          date: new Date().toLocaleString(),
        },
        true
      );
      addMessage(
        {
          sender: Sender.AI,
          text: response,
          date: new Date().toLocaleString(),
        },
        true
      );
      speechText = response;
      animation = Animation.Yes;
      historyStore.setMessage("");
    }
    await speakText(speechText, () => {
      animationStore.setAnimation(animation);
    });
    animationStore.setAnimation(Animation.Wave);
    responseWasReceived();
  }, [
    addMessage,
    animationStore,
    historyFormatted,
    historyStore,
    openAi,
    requestWasSent,
    responseWasReceived,
  ]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!loading) {
        buttonCallback();
      }
    }
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      historyStore.setMessage(event.target.value);
    },
    [historyStore]
  );

  return (
    <div className="chat-input">
      <textarea
        placeholder="Type your message here..."
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={handleChange}
        disabled={loading}
        title={loading ? "Wait until AI delivers its response to you" : ""}
        value={historyStore.message}
      />
      <button
        onClick={buttonCallback}
        disabled={loading || !historyStore.canSend}
      >
        Send
      </button>
    </div>
  );
});
