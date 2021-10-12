import React from 'react';

//buttons:
import cogwheel from '../assets/imgs/setting.png';
import attachment from '../assets/imgs/attachment.png';
import smiley from '../assets/imgs/smiley.png';
import send from '../assets/imgs/send.png';

export const Chat = () => {
  return (
    <div className="chat-container">
      <form action="">
        <input type="text" autoCorrect />
        <button type="submit">
          <img src={send} alt="send" />
        </button>
      </form>
      <div className="chat-btns">
        <span> | </span>
        <img src={cogwheel} alt="settings" />
        <img src={attachment} alt="attachment" />
        <img src={smiley} alt="smiley" />
      </div>
    </div>
  );
};
