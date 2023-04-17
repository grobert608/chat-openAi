import { render } from "@testing-library/react";
import { History } from "./History";
import { RootStoreContext } from "../hooks/useStores";

describe("History", () => {

    it("should render", () => {
        const store = {
            historyStore: {
                history: [
                    {
                        text: "Hello",
                        date: new Date().toLocaleString(),
                        sender: "human",
                    },
                ],

            },
            openAiStore: {
                loading: false,
            },
            animationStore: {
                animation: 12,
            },
        };
        const { container } = render(
            <RootStoreContext.Provider value={store}>
                <History />
            </RootStoreContext.Provider>
        );
        expect(container).toMatchSnapshot();
    });
});