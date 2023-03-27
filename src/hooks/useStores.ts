import React from "react";
import { RootStore } from "../stores/rootStore";

export const RootStoreContext = React.createContext<RootStore | null>(
  null
);

export function useStores() {
  const context = React.useContext(RootStoreContext);
  if (!context) {
    throw new Error("Fogo, context is empty!");
  }

  return context;
}
