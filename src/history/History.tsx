import { observer } from "mobx-react";
import React, { createRef, useEffect } from "react";
import { useStores } from "../hooks/useStores";
import { Message } from "./Message";
import { Typing } from "./Typing";
import { Sender } from "../domain/message";

export const History: React.FC = observer(function History() {
  const { historyStore, openAiStore } = useStores();
  const { loading } = openAiStore;
  const history = historyStore.history;
  const lastMessage = createRef<HTMLDivElement>();

  useEffect(() => {
    lastMessage.current?.scrollIntoView();
  }, [history, lastMessage]);

  return (
    <div className="chat-messages">
      {history.map((h, id) => (
        <Message
          key={id}
          text={h.text}
          time={h.date}
          myMessage={h.sender === Sender.Human}
        />
      ))}
      {!loading && (<Typing/>)}
      <div ref={lastMessage} />
    </div>
  );
});
