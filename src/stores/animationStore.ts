import { action, observable } from "mobx";
import { Animation } from "../domain/animation";

export const animationStore: AnimationStore = observable<AnimationStore>(
  {
    animation: Animation.Wave,
    setAnimation(newAnimation: Animation) {
      this.animation = newAnimation;
    },
  },
  {
    setAnimation: action.bound,
  }
);

export interface AnimationStore {
  animation: Animation;
  setAnimation: (a: Animation) => void;
}
