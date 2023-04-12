import { Configuration, OpenAIApi } from "openai";
import React from "react";

const chatModel = {
  name: "Friendly Chat",
  id: "friendly-chat",
  description: "Emulate a text message conversation.",
  option: {
    model: "text-davinci-003",
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  },
};

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const createPrompt = (histoty: string, question: string) =>
  `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n${histoty}\nHuman: ${question}\nAI:`.trim();

export function useOpenAi(
  mock?: boolean
): (histoty: string, question: string) => Promise<string | Error> {
  const makeRequest: (
    histoty: string,
    question: string
  ) => Promise<string | Error> = React.useCallback(
    async (histoty: string, question: string) => {
      if (mock && question.trim() !== "") {
        return "Hello, I am a mock response";
      }
      if (question.trim() !== "") {
        try {
          const prompt: string = createPrompt(histoty, question);
          const result = await openai.createCompletion({
            ...chatModel.option,
            prompt: prompt,
          });
          return result.data.choices[0].text!.trim();
        } catch (e) {
          console.log("Request failed: " + e);
          if (e instanceof Error) {
            return e;
          } else {
            return Error("No response");
          }
        }
      }
      return Error("No response");
    },
    [mock]
  );
  return makeRequest;
}
