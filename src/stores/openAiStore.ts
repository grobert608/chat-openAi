import { action, observable } from "mobx";

export const openAiStore: OpenAiStore = observable(
  {
    loading: false as boolean,
    requestWasSent() {
      this.loading = true;
    },
    responseWasRecieved() {
      this.loading = false;
    },
  },
  {
    requestWasSent: action.bound,
    responseWasRecieved: action.bound,
  }
);

export interface OpenAiStore {
  loading: boolean;
  requestWasSent: () => void;
  responseWasRecieved: () => void;
}
