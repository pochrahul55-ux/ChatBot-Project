import { useRef, useEffect } from "react";
import LoadingImage from '../assets/loading-spinner.gif';
import ChatResponse from "./ChatResponse";
import './ChatMessages.css'


function useAutoScroll(dependencies) {
    const chatMessagesRef = useRef(null);
    useEffect(() => {
      const containerEle = chatMessagesRef.current;
      if (containerEle) {
        containerEle.scrollTop = containerEle.scrollHeight
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
    return chatMessagesRef;
  }

function ChatMessages({ chatMessages, isLoading }) {     
  const chatMessagesRef = useAutoScroll([chatMessages])
  return (
    <div className="chat-message-container"
      ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => (
        <ChatResponse
          sender={chatMessage.sender}
          message={chatMessage.message}
          key={chatMessage.id}
          time={chatMessage.time}
        />
      ))}
      {chatMessages.length === 0
        && <p className="welcome-text">Welcome to the Chatbot project! Send a message using the textbox below</p>              
        }
      {isLoading && (
        <ChatResponse
          sender="robot"
          message={<img src={LoadingImage}className="loading-img"/>}
          key="loading"
        />
      )}
    </div>
  );
}

export default ChatMessages;