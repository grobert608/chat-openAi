import { observer } from "mobx-react";
import React, { useCallback } from "react";
import { Animation } from "../domain/animation";
import { Sender } from "../domain/message";
import { useStores } from "../hooks/useStores";
import { useOpenAi } from "../open-ai/openAi";
import { speakText } from "../speechSynthesis/speechSynthesis";

export const Chat: React.FC = observer(function Chat() {
  // const messageRef = createRef<HTMLTextAreaElement>();

  const { historyStore, openAiStore, animationStore } = useStores();
  const { loading, requestWasSent, responseWasRecieved } = openAiStore;
  const { historyFormated, addMessage } = historyStore;

  const openAi: (histoty: string, question: string) => Promise<string | Error> =
    useOpenAi(true);

  const buttonCallback = useCallback(async () => {
    requestWasSent();
    const question: string = historyStore.message; //messageRef.current?.value!;
    // messageRef.current!.value = "";
    const response = await openAi(historyFormated, question);

    let textToUtter = "Sorry, something went wrong! Try again later.";
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

      textToUtter = response;
      animation = Animation.Yes;
      historyStore.setMessage("");
    }

    await speakText(
      textToUtter,
      () => {
        animationStore.setAnimation(animation);
      });

    animationStore.setAnimation(Animation.Wave);
    responseWasRecieved();
  }, [
    addMessage,
    animationStore,
    historyStore,
    historyFormated,
    // messageRef,
    openAi,
    requestWasSent,
    responseWasRecieved,
  ]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!loading) {
        buttonCallback();
      }
    }
  };

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    historyStore.setMessage(event.target.value);
  }, [historyStore]);

  return (
    <div className="chat-input">
      <textarea
        placeholder="Type your message here..."
        // ref={messageRef}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={handleChange}
        disabled={loading}
        title={loading ? "Wait until AI delivers its response to you" : ""}
        value={historyStore.message}
      />
      <button onClick={buttonCallback} disabled={loading || !historyStore.canSend}>
        Send
      </button>
    </div>
  );
});
