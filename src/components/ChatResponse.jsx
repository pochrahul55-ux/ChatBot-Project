import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/profile-1.jpg';
import './ChatResponse.css'
import dayjs from 'dayjs'

// We need this component since react cannot display Raw data. We need this
// to convert raw data to HTML.
function ChatResponse({ sender, message, time }) { 
  return ( 
    <div className=
      {sender === 'user' 
        ? 'chat-message-user' 
        : 'chat-message-robot'}
    >
      { sender === 'robot' && <img src={RobotProfileImage} className="chat-message-image" />}
      <div className="chat-message-text">
        { message }
        {time && 
          <div 
            className='time-stamp'>{dayjs(time).format('h:mma')}
          </div>
        }     
      </div>
      { sender === 'user' && <img src={UserProfileImage}className="chat-message-image" />}
    </div>
  )     
}

export default ChatResponse;