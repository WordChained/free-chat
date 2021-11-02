import React, { useEffect, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { setCurrRoom, setCurrRoomById } from '../store/actions/roomActions';
import { socketService } from '../services/socketService';
import { Chat } from '../cmps/Chat';

// images:
import defaultRoomImg from '../assets/imgs/room.png';
import back from '../assets/imgs/back.png';
// import { io } from 'socket.io-client';

export const Room = memo(() => {
  const { currRoom } = useSelector((state) => state.roomModule);
  const { loggedInUser, guestUser } = useSelector((state) => state.userModule);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  // const [socket, setSocket] = useState(null);

  useEffect(() => {
    //5 renders for some reason...
    dispatch(setCurrRoomById(id));
    if (currRoom) {
      // const socket = socketService();
      const topicToWatch = currRoom.topic + currRoom._id;
      socketService.emit('room topic', topicToWatch);
    }
    return () => {
      socketService.on('disconnect');
    };
    //eslint-disable-next-line
  }, []);

  const exitRoom = () => {
    history.goBack();
    dispatch(setCurrRoom(null));
  };
  if (!currRoom)
    return (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  return (
    <div className="room-container">
      {/* <Link to={`/rooms`} replace>
        All rooms
      </Link> */}
      <img
        className="room-img"
        src={currRoom.imgUrl ? currRoom.imgUrl : defaultRoomImg}
        alt="room"
      />
      <button onClick={exitRoom} className="back-btn">
        <img src={back} alt="back-btn" />
      </button>

      <h3 className="room-title">{currRoom.name}</h3>
      {(loggedInUser || guestUser) && <Chat />}
    </div>
  );
});
