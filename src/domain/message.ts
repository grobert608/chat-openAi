export type Message = {
  sender: Sender;
  text: string;
  date: string;
};

export enum Sender {
  Human,
  AI,
}
