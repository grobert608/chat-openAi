interface MessageProps {
  text: string;
  time: string;
  myMessage: boolean;
}

export const Message: React.FC<MessageProps> = ({ text, time, myMessage }) => {
  return (
    <div className={myMessage ? "chat-message right" : "chat-message"}>
      <div className="message-content">
        <p>{text}</p>
      </div>
      <div className="message-time">
        <span>{time}</span>
      </div>
    </div>
  );
};
