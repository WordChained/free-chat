import React, { useState, useEffect } from 'react';
import star from '../assets/imgs/star.png';
import like from '../assets/imgs/like.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  starMsg,
  unStarMsg,
  likeMsg,
  unLikeMsg,
} from '../store/actions/chatActions';
export const MsgEditOptions = ({ msg, currUser, isLiked, isStarred, room }) => {
  const dispatch = useDispatch();
  const { currRoom } = useSelector((state) => state.roomModule);
  // const { currChatMsgs } = useSelector((state) => state.chatModule);

  const [justLiked, setJustLike] = useState(null);
  const [justStarred, setJustStarred] = useState(null);

  useEffect(() => {
    msg.star.includes(currUser._id)
      ? setJustStarred(true)
      : setJustStarred(false);
    msg.likes.includes(currUser._id) ? setJustLike(true) : setJustLike(false);
    //eslint-disable-next-line
  }, [msg.star, msg.likes]);

  const starMessage = () => {
    if (currUser.sex === 'guest') {
      //add to userMsg
      alert('Only registered users can like and star messages');
      //   console.log('Only registered users can like and star messages');
      return;
    }
    if (msg.star.includes(currUser._id)) {
      console.log('star toggle off');
      dispatch(unStarMsg(room._id, msg.uid, msg.id, currRoom));
      // setJustStarred(false);
    } else {
      console.log('star toggle on');
      dispatch(starMsg(room._id, msg.uid, msg.id, currRoom));
      // setJustStarred(true);
    }
  };
  const likeMessage = () => {
    if (currUser.sex === 'guest') {
      //add to userMsg
      alert('Only registered users can like and star messages');
      //   console.log('Only registered users can like and star messages');
      return;
    }
    if (msg.likes.includes(currUser._id)) {
      console.log('like toggle off');
      dispatch(unLikeMsg(room._id, msg.uid, msg.id, currRoom));
      // setJustLike(false);
    } else {
      console.log('like toggle on');
      dispatch(likeMsg(room._id, msg.uid, msg.id, currRoom));
      // setJustLike(true);
    }
  };
  const editMsg = () => {
    //
  };
  const removeMsg = () => {
    //
  };

  return (
    <div className="msg-edit-options">
      <img
        onClick={starMessage}
        className={justStarred ? 'starred' : ''}
        src={star}
        alt="star"
      />
      <img
        onClick={likeMessage}
        className={justLiked ? 'liked' : ''}
        src={like}
        alt="like"
      />
      {currUser && currUser._id === msg.uid && (
        <div className="user-edit-options">
          <button onClick={editMsg} className="edit user-option">
            Edit
          </button>
          <button onClick={removeMsg} className="delete user-option">
            X
          </button>
        </div>
      )}
    </div>
  );
};
