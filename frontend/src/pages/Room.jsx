import React, { useEffect, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { setCurrRoom, setCurrRoomById } from '../store/actions/roomActions';
import { socketService } from '../services/socketService';
import { Chat } from '../cmps/Chat';

import { io } from 'socket.io-client';

export const Room = memo(() => {
  const { currRoom } = useSelector((state) => state.roomModule);
  const { loggedInUser, guestUser } = useSelector((state) => state.userModule);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    //5 renders for some reason...
    dispatch(setCurrRoomById(id));
    if (!socket) {
      const socketIOClient = io('http://localhost:3000', {
        withCredentials: true,
      });
      setSocket(socketIOClient);
    }
    if (currRoom) {
      // const socket = socketService();
      const topicToWatch = currRoom.topic + currRoom._id;
      socketService.emit('room topic', topicToWatch);
      // socketService.on('set-room-socket', topicToWatch);
      // socketService.on('room watch', topicToWatch);
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
      <button onClick={exitRoom}>Back</button>
      <h3>{currRoom.name}</h3>
      {(loggedInUser || guestUser) && socket && <Chat socket={socket} />}
    </div>
  );
});
