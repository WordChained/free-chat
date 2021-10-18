import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  // Color,
  Palette,
} from 'color-thief-react';
//buttons imgs:
import cogwheel from '../assets/imgs/setting.png';
import attachment from '../assets/imgs/attachment.png';
import smiley from '../assets/imgs/smiley.png';
import send from '../assets/imgs/send.png';

import maleUser from '../assets/imgs/tattoo-male.png';
import femaleUser from '../assets/imgs/tattoo-female.png';
import guestImg from '../assets/imgs/guest.png';

import { getMsgs, addMsg } from '../store/actions/chatActions';
import { getLoggedinUser, getUsers } from '../store/actions/userActions';
import { AlwaysScrollToBottom } from './AlwaysScrollToBottom';
import { socketService } from '../services/socketService';

export const Chat = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { currChatMsgs } = useSelector((state) => state.chatModule);
  const { loggedInUser, guestUser, users } = useSelector(
    (state) => state.userModule
  );
  const { currRoom } = useSelector((state) => state.roomModule);

  const [sent, setSent] = useState(false);
  const [defaultImg, setDefaultImg] = useState('');
  // const [senderImg, setSenderImg] = useState('');

  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    if (!users) {
      dispatch(getUsers());
    }
    setCurrUser(getLoggedinUser());
    if (guestUser) {
      // setCurrUser(guestUser);
      setDefaultImg(guestImg);
    } else if (loggedInUser) {
      // setCurrUser(loggedInUser);
      setDefaultImg(loggedInUser.sex === 'male' ? maleUser : femaleUser);
    }
    dispatch(getMsgs(currRoom._id));
    // setTimeout(() => {
    setSent(true);
    // }, 1500);
    // const roomToWatch = currRoom.topic + currRoom._id;
    // socketService.on('room watch', roomToWatch);
    // socketService.on('chat addMsg', dispatch(getMsgs(currRoom._id)));
    return () => {};
    // !!!!!!!!!!!
    //need to 'destroy' chat to clear msgs so they wont appear for a moment when i open a new room
    //!!!!!!!!!!!!!!!
    //eslint-disable-next-line
  }, []);

  //a component to always scroll down to!

  const getSenderInfo = (type, msg) => {
    const sender = users.find((u) => {
      return u._id === msg.uid;
    });
    if (sender) {
      // setSenderImg(sender.imgUrl);
      return sender[type];
    }
  };

  const onSubmit = (data) => {
    if (!data['msg-input']) return;
    // console.log('currUser is the sender...', currUser);
    // console.log('msg-input:', data['msg-input']);
    const nameToAttatch = currUser.sex === 'guest' ? 'fullName' : 'userName';
    dispatch(
      addMsg(
        currRoom._id,
        data['msg-input'],
        currUser._id,
        currUser[nameToAttatch]
      )
    );
    const newMsg = {
      msg: data['msg-input'],
      uid: currUser._id,
      name: currUser[nameToAttatch],
    };
    socketService.on('room newMsg', newMsg);
    reset();
  };

  if (!currUser || !users)
    return (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  return (
    <div className="chat-container">
      {currChatMsgs && (
        <div className="msgs-container">
          <p className="start-of-chat">This is the beggining of the chat!</p>

          {currChatMsgs.map((msg) => (
            <div
              key={msg.id}
              className={`single-msg ${
                currUser && currUser._id === msg.uid ? 'sender' : ''
              }`}
            >
              <Palette
                src={
                  currUser && getSenderInfo('imgUrl', msg)
                    ? getSenderInfo('imgUrl', msg)
                    : msg.name.includes('guest')
                    ? guestImg
                    : defaultImg
                }
                crossOrigin="anonymous"
                format="hex"
                colorCount={4}
              >
                {({ data, loading }) => {
                  if (loading) return <div>🕒</div>;
                  return (
                    <img
                      style={{
                        backgroundColor: data[data.length / 2],
                      }}
                      className="user-img"
                      src={
                        currUser && getSenderInfo('imgUrl', msg)
                          ? getSenderInfo('imgUrl', msg)
                          : msg.name.includes('guest')
                          ? guestImg
                          : defaultImg
                      }
                      alt="userImg"
                    />
                  );
                }}
              </Palette>
              <div
                key={msg.id}
                name="single-msg-txt"
                className={currUser && currUser._id === msg.uid ? 'sender' : ''}
              >
                <span className="sender-name">
                  {getSenderInfo('userName', msg)
                    ? getSenderInfo('userName', msg)
                    : msg.name}
                </span>
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
          <AlwaysScrollToBottom />
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
