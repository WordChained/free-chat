import React from 'react';
import star from '../assets/imgs/star.png';
import like from '../assets/imgs/like.png';
export const MsgEditOptions = ({ msg, currUser, isLiked, isStarred }) => {
  return (
    <div className="msg-edit-options">
      <img className={isStarred ? 'starred' : ''} src={star} alt="star" />
      <img className={isLiked ? 'liked' : ''} src={like} alt="like" />
      {currUser && currUser._id === msg.uid && (
        <div className="user-edit-options">
          <button className="edit user-option">Edit</button>
          <button className="delete user-option">X</button>
        </div>
      )}
    </div>
  );
};
