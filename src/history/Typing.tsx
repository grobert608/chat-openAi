interface TypingProps {
  show: boolean;
}

export const Typing: React.FC<TypingProps> = ({ show }) => {
  if (show) {
    return (
      <div className="chat-message typing">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
  return <></>;
};
