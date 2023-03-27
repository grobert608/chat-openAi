import { animationStore, AnimationStore } from "./animationStore";
import { HistoryStore, historyStore } from "./historyStore";
import { openAiStore, OpenAiStore } from "./openAiStore";

export class RootStore {
  historyStore: HistoryStore;
  openAiStore: OpenAiStore;
  animationStore: AnimationStore;

  public constructor() {
    this.historyStore = historyStore;
    this.openAiStore = openAiStore;
    this.animationStore = animationStore;
  }
}
