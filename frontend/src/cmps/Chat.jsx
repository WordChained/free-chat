import { memo, useEffect, useState } from 'react';
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
import edit from '../assets/imgs/edit.png';

//user images
import maleUser from '../assets/imgs/tattoo-male.png';
import femaleUser from '../assets/imgs/tattoo-female.png';
import guestImg from '../assets/imgs/guest.png';

import { getMsgs, addMsg } from '../store/actions/chatActions';
import { getLoggedinUser, getUsers } from '../store/actions/userActions';
import { socketService } from '../services/socketService';

import { AlwaysScrollToBottom } from './AlwaysScrollToBottom';
import { MsgEditOptions } from './MsgEditOptions';

export const Chat = memo(({ socket }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { currChatMsgs } = useSelector((state) => state.chatModule);
  const { loggedInUser, guestUser, users } = useSelector(
    (state) => state.userModule
  );
  const { currRoom } = useSelector((state) => state.roomModule);

  const [sent, setSent] = useState(false);
  const [defaultImg, setDefaultImg] = useState('');
  const [currUser, setCurrUser] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [currMsgToEdit, setCurrMsgToEdit] = useState({
    edit: false,
    msgId: null,
  });

  useEffect(() => {
    const topicToWatch = currRoom.topic + currRoom._id;
    socketService.emit('room topic', topicToWatch);
    if (!users) {
      dispatch(getUsers());
    }
    setCurrUser(getLoggedinUser());
    if (guestUser) {
      setDefaultImg(guestImg);
    } else if (loggedInUser) {
      setDefaultImg(loggedInUser.sex === 'male' ? maleUser : femaleUser);
    }

    dispatch(getMsgs(currRoom._id));
    setSent(true);
    socketService.on('room addMsg', (msg) => {
      console.log('socket:', socket);
      dispatch(
        addMsg(
          currRoom._id,
          msg.text,
          msg.uid,
          msg.name,
          msg.isEdit,
          msg.star,
          msg.likes
        )
      );
      setTimeout(() => {
        dispatch(getMsgs(currRoom._id));
      }, 100);
    });
    return () => {
      dispatch(getMsgs(null));
      socketService.off('room addMsg');
    };

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currUser && currRoom && currRoom.msgs) {
      console.log('happened');
      currRoom.msgs.map((msg) => {
        isLikedByCurrUser(msg.id);
        isStarredByCurrUser(msg.id);
      });
    }
  }, [currUser]);

  const checkIsEmpty = (ev) => {
    if (ev.target.value === '') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const isLikedByCurrUser = (msgId) => {
    const msg = currRoom.msgs.find((msg) => msg.id === msgId);
    if (msg && msg.likes.includes(currUser._id)) {
      setIsLiked(true);
    }
  };
  const isStarredByCurrUser = (msgId) => {
    const msg = currRoom.msgs.find((msg) => msg.id === msgId);
    if (msg && msg.star.includes(currUser._id)) {
      setIsStarred(true);
    }
  };
  const getSenderInfo = (type, msg) => {
    const sender = users.find((u) => {
      return u._id === msg.uid;
    });
    if (sender) {
      return sender[type];
    }
  };
  const changeEditState = (msgId, uid) => {
    if (currMsgToEdit.edit === true && currMsgToEdit.msgId === msgId) {
      setCurrMsgToEdit({ edit: false, msgId: null });
    } else {
      setCurrMsgToEdit({ edit: true, msgId });
    }
  };

  const onSubmit = (data) => {
    console.log('on submit was called');
    if (!data['msg-input']) return;
    // console.log('currUser is the sender...', currUser);
    // console.log('msg-input:', data['msg-input']);
    const nameToAttatch = currUser.sex === 'guest' ? 'fullName' : 'userName';
    const newMsg = {
      text: data['msg-input'],
      uid: currUser._id,
      name: currUser[nameToAttatch],
      isEdit: false,
      star: [],
      likes: [],
    };
    socketService.emit('room newMsg', newMsg);
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
              {/* {isLikedByCurrUser(msg.id)}
              {isStarredByCurrUser(msg.id)} */}
              {currMsgToEdit.edit && currMsgToEdit.msgId === msg.id && (
                <MsgEditOptions
                  msg={msg}
                  currUser={currUser}
                  isLiked={isLiked}
                  isStarred={isStarred}
                />
              )}
              <div
                key={msg.id}
                name="single-msg-txt"
                className={
                  currUser && currUser._id === msg.uid
                    ? 'sender'
                    : currMsgToEdit.edit
                    ? 'edit'
                    : ''
                }
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
                <img
                  className="edit-btn"
                  src={edit}
                  alt="edit"
                  onClick={() => changeEditState(msg.id, msg.uid)}
                />
              </div>
            </div>
          ))}
          <AlwaysScrollToBottom />
        </div>
      )}
      <div className="typing-line">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register('msg-input')}
            id="msg-input"
            type="text"
            spellCheck="true"
            autoComplete="off"
            // ref={elInput}
            className={isEmpty ? '' : 'allowed'}
            onKeyUp={checkIsEmpty}
          />
          <button type="submit" className={isEmpty ? '' : 'allowed'}>
            <img className={isEmpty ? '' : 'allowed'} src={send} alt="send" />
          </button>
        </form>
        <div className="chat-btns">
          <span> | </span>
          <img src={cogwheel} alt="settings" />
          <img src={attachment} alt="attachment" />
          <img src={smiley} alt="smiley" />
        </div>
      </div>
    </div>
  );
});
