import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PrivateChat } from '../cmps/PrivatChat';
import { useHistory } from 'react-router-dom';
import { setCurrPrivateRoom } from '../store/actions/roomActions';
import { useDispatch } from 'react-redux';
import { getEmptyPrivateRoom } from '../services/roomService';

import back from '../assets/imgs/back.png';

export const PrivateRoom = () => {
  const dispatch = useDispatch();
  const { currPrivateRoom } = useSelector((state) => state.roomModule);
  const history = useHistory();
  console.log('currPrivateRoom:', currPrivateRoom);

  //   const [topics, setTopics] = useState(storageService.load('topics'));
  const [topics, setTopics] = useState(
    JSON.parse(sessionStorage.getItem('topics'))
  );
  useEffect(() => {
    console.log('topics:', topics);
    const privateRoom = getEmptyPrivateRoom();
    privateRoom.topics = topics;
    dispatch(setCurrPrivateRoom(privateRoom));
  }, []);

  if (!currPrivateRoom)
    return (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  return (
    <div className="private-room room-container">
      <div className="header">
        <h2>Free Chat</h2>
        <div className="topic-list">
          {currPrivateRoom.topics.map((topic, idx) => {
            if (idx === topics.length - 1)
              return <span key="topic.value">{topic.label}.</span>;
            else return <span key="topic.value">{topic.label} , </span>;
          })}
        </div>
      </div>
      <button
        className="back-btn"
        onClick={() => {
          history.push('/');
        }}
      >
        <img src={back} alt="back" />
      </button>
      <PrivateChat />
    </div>
  );
};
