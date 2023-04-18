interface MessageProps {
  text: string;
  time: string;
  myMessage: boolean;
}

export const Message: React.FC<MessageProps> = ({ text, time, myMessage }) => {
  return (
    <div className={"chat-message" + (myMessage ? " right" : "")}>
      <div className="message-content">
        <p>{text}</p>
        <div className="message-time">{time}</div>
      </div>
    </div>
  );
};
