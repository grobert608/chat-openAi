import localforage from "localforage";
import { Message } from "../domain/message";
import { HistoryStore } from "../stores/historyStore";

export function configLocalStorage(): Promise<void> {
  localforage.config({
    name: "chat-with-openai-storage",
    storeName: "chatWithOpenAI",
  });
  return localforage.setDriver(localforage.INDEXEDDB);
}

export function recoverLastNMessages(n: number, historyStore: HistoryStore) {
  localforage.keys().then((keys) => {
    keys
      .map((key) => Number.parseInt(key))
      .sort((a, b) => a - b)
      .slice(-n)
      .forEach((key) => {
        localforage.getItem(key.toString()).then((value) => {
          historyStore.addMessage(value as Message);
          historyStore.setId(key);
        });
      });
    if (keys.length > n) {
      keys
        .map((key) => Number.parseInt(key))
        .sort((a, b) => a - b)
        .slice(0, keys.length - n)
        .forEach((key) => {
          localforage.removeItem(key.toString());
        });
    }
  });
}

export function saveMessage(key: number, message: Message): Promise<Message> {
  return localforage.setItem(key.toString(), message);
}
