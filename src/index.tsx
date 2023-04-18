import ReactDOM from "react-dom/client";
import { RootStoreContext } from "./hooks/useStores";
import "./index.css";
import { Root } from "./root";
import { RootStore } from "./stores/rootStore";

function App() {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <Root />
    </RootStoreContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<App />);
