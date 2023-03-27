import { action, observable } from "mobx";
import { Message, Sender } from "../domain/message";
import localforage from "localforage";

export const historyStore: HistoryStore = observable(
  {
    id: 0,
    history: [] as Message[],
    get historyFormated(): string {
      return this.history
        .map((d) => {
          if (d.sender === Sender.Human) {
            return `Human: ${d.text}`;
          } else {
            return `AI: ${d.text}`;
          }
        })
        .join(`\n`);
    },
    addMessage(message: Message, toDB?: boolean) {
      if (toDB) {
        this.setId(this.id + 1)
        localforage.setItem(this.id.toString(), message);
      }
      this.history.push(message);
    },
    setId(newId: number) {
      this.id = newId;
    },
  },
  {
    addMessage: action.bound,
    setId: action.bound,
  }
);

export interface HistoryStore {
  id: number;
  history: Message[];
  historyFormated: string;
  addMessage: (dialog: Message, toDB?: boolean) => void;
  setId: (newId: number) => void;
}
