import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
//buttons imgs:
import cogwheel from '../assets/imgs/setting.png';
import attachment from '../assets/imgs/attachment.png';
import smiley from '../assets/imgs/smiley.png';
import send from '../assets/imgs/send.png';

import { getMsgs, addMsg } from '../store/actions/chatActions';
export const Chat = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { currChatMsgs } = useSelector((state) => state.chatModule);
  const { loggedInUser } = useSelector((state) => state.userModule);
  const { currRoom } = useSelector((state) => state.roomModule);

  useEffect(() => {
    dispatch(getMsgs(currRoom._id));
  }, []);

  const onSubmit = (data) => {
    console.log('msg-input:', data['msg-input']);
    // const msg = {id: }
    // ObjectId id = new ObjectId();
    dispatch(addMsg(currRoom._id, data['msg-input']));
    reset();
  };

  return (
    <div className="chat-container">
      {currChatMsgs && (
        <div className="msgs-container">
          {currChatMsgs.map((msg) => (
            <div
              key={msg.id}
              name="single-msg"
              className={
                loggedInUser && loggedInUser._id === msg.id ? 'sender' : ''
              }
            >
              {msg.text}
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('msg-input')}
          id="msg-input"
          type="text"
          spellCheck="true"
          autoComplete="off"
        />
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
