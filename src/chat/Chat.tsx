import { observer } from "mobx-react";
import React, { createRef, useCallback } from "react";
import { Animation } from "../domain/animation";
import { Sender } from "../domain/message";
import { useStores } from "../hooks/useStores";
import { useOpenAi } from "../open-ai/openAi";
import { speakText } from "../speechSynthesis/speechSynthesis";

export const Chat: React.FC = observer(function Chat() {
  const messageRef = createRef<HTMLTextAreaElement>();

  const { historyStore, openAiStore, animationStore } = useStores();
  const { loading, requestWasSent, responseWasRecieved } = openAiStore;
  const { historyFormated, addMessage } = historyStore;

  const openAi: (histoty: string, question: string) => Promise<string | Error> =
    useOpenAi(true);

  const buttonCallback = useCallback(async () => {
    requestWasSent();
    const question: string = messageRef.current?.value!;
    messageRef.current!.value = "";
    const response = await openAi(historyFormated, question);
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
      speakText(
        response,
        () => {
          animationStore.setAnimation(Animation.Yes);
        },
        () => {
          animationStore.setAnimation(Animation.Wave);
          responseWasRecieved();
        }
      );
    } else {
      speakText(
        "Sorry, something went wrong! Try again later.",
        () => {
          animationStore.setAnimation(Animation.No);
        },
        () => {
          animationStore.setAnimation(Animation.Dance);
          responseWasRecieved();
        }
      );
    }
  }, [
    addMessage,
    animationStore,
    historyFormated,
    messageRef,
    openAi,
    requestWasSent,
    responseWasRecieved,
  ]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonCallback();
    }
  };

  return (
    <div className="chat-input">
      <textarea
        placeholder="Type your message here..."
        ref={messageRef}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button onClick={buttonCallback} disabled={loading}>
        Send
      </button>
    </div>
  );
});
