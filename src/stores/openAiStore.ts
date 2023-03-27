import { action, observable } from "mobx";

export const openAiStore: OpenAiStore = observable<OpenAiStore>(
  {
    loading: false,
    requestWasSent() {
      this.loading = true;
    },
    responseWasReceived() {
      this.loading = false;
    },
  },
  {
    requestWasSent: action.bound,
    responseWasReceived: action.bound,
  }
);

export interface OpenAiStore {
  loading: boolean;
  requestWasSent: () => void;
  responseWasReceived: () => void;
}
