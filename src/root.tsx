import { useEffect } from "react";
import { Chat } from "./chat/Chat";
import { configLocalStorage, recoverLastNMessages } from "./db/dbUtils";
import { History } from "./history/History";
import { useStores } from "./hooks/useStores";
import "./index.css";
import { Room } from "./robot/Room";

export const Root = () => {
  const { historyStore } = useStores();

  useEffect(() => {
    configLocalStorage().then(() => {
      recoverLastNMessages(10, historyStore);
    });
  }, [historyStore]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="chat-container">
        <History />
        <Chat />
      </div>
      <Room />
    </div>
  );
};
