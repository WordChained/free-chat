import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Color from 'color-thief-react';
//buttons imgs:
import cogwheel from '../assets/imgs/setting.png';
import attachment from '../assets/imgs/attachment.png';
import smiley from '../assets/imgs/smiley.png';
import send from '../assets/imgs/send.png';

import maleUser from '../assets/imgs/tattoo-male.png';
import femaleUser from '../assets/imgs/tattoo-female.png';
import guest from '../assets/imgs/guest.png';

import { getMsgs, addMsg } from '../store/actions/chatActions';

export const Chat = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { currChatMsgs } = useSelector((state) => state.chatModule);
  const { loggedInUser, guestUser } = useSelector((state) => state.userModule);
  const { currRoom } = useSelector((state) => state.roomModule);

  const [sent, setSent] = useState(false);
  const [defaultImg, setDefaultImg] = useState('');

  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    if (guestUser) {
      setCurrUser(loggedInUser);
      setDefaultImg(guest);
    } else if (loggedInUser) {
      setCurrUser(loggedInUser);
      setDefaultImg(loggedInUser.sex === 'male' ? maleUser : femaleUser);
    }
    dispatch(getMsgs(currRoom._id));
    setTimeout(() => {
      setSent(true);
    }, 1500);
    // !!!!!!!!!!!
    //need to 'destroy' chat to clear msgs so they wont appear for a moment when i open a new room
    //!!!!!!!!!!!!!!!
    //eslint-disable-next-line
  }, []);

  const onSubmit = (data) => {
    if (!data['msg-input']) return;
    console.log('msg-input:', data['msg-input']);
    dispatch(addMsg(currRoom._id, data['msg-input'], loggedInUser._id));
    reset();
  };

  return (
    <div className="chat-container">
      {currChatMsgs && (
        <div className="msgs-container">
          {currChatMsgs.map((msg) => (
            <div
              key={msg.id}
              className={`single-msg ${
                loggedInUser && loggedInUser._id === msg.uid ? 'sender' : ''
              }`}
            >
              <Color
                src={
                  loggedInUser && loggedInUser.imgUrl
                    ? loggedInUser.imgUrl
                    : defaultImg
                }
                crossOrigin="anonymous"
                format="hex"
              >
                {({ data, loading }) => {
                  if (loading) return <div>🕒</div>;
                  return (
                    <img
                      style={{ backgroundColor: data }}
                      className="user-img"
                      src={
                        loggedInUser && loggedInUser.imgUrl
                          ? loggedInUser.imgUrl
                          : defaultImg
                      }
                      alt="userImg"
                    />
                  );
                }}
              </Color>
              <div
                key={msg.id}
                name="single-msg-txt"
                className={
                  loggedInUser && loggedInUser._id === msg.uid ? 'sender' : ''
                }
              >
                {msg.text}
                <span className="sent-at">
                  {new Date(msg.sentAt).toLocaleTimeString('he-IL', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  <span className={`msg-status-marks ${sent ? 'sent' : ''}`}>
                    ✔✔
                  </span>
                </span>
              </div>
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
