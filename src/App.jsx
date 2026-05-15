import { useState } from 'react'
import './App.css'
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import RobotProfileimage from './assets/robot.png';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    Chatbot.addResponses({
      'hi': 'Hey there! How can i help you?',
      'how is the weather outside?': 'Its sunny with 78F',
      'whats your name?': 'I am ChatBot!'
    })
  }, []);

  const title = `${chatMessages.length} Messages`;

  return (
    <>
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href={RobotProfileimage} />

      <div className="chat-container">
        <ChatMessages
          chatMessages={chatMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  )
}

export default App;
