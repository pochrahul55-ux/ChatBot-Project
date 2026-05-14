import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css'
import dayjs from 'dayjs'

function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading }) {
  const [inputText, setInputText] = useState('');
  function saveText(event) {
    setInputText(event.target.value);
  }
  async function sendMessage() {
    if (inputText.trim() === '') return;

    setInputText('');
    setChatMessages([
      ...chatMessages, 
      {
        sender: 'user',
        message: inputText,
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);
    setIsLoading(true);
    const chatbotResponse = await Chatbot.getResponseAsync(inputText);
    setIsLoading(false);
    setChatMessages((previousMsg) => [
      ...previousMsg, 
      {
        sender: 'robot',
        message: chatbotResponse,
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);
  }
  function enterBtn(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
    if (event.key === 'Escape') {
      setInputText('');
    }
  }
  function clearBtn() {
    setChatMessages([]);
  }
  return (
    <div className="chat-input-container">
      <input 
        type="text" 
        placeholder="Enter your question" 
        onChange={saveText} 
        value={inputText} 
        onKeyDown={enterBtn}
        className="input-text"
      />
      <button 
        onClick={sendMessage} 
        disabled={isLoading}
        className="send-button"
      >Send</button>
      <button 
        onClick={clearBtn}
        className='clear-button'
        >Clear
      </button>
    </div>
  )
}

export default ChatInput;