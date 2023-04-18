export type Message = {
  sender: Sender;
  text: string;
  date: string;
};

export const enum Sender {
  Human,
  AI,
}
