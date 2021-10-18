import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { setCurrRoom, setCurrRoomById } from '../store/actions/roomActions';
import { socketService } from '../services/socketService';
import { Chat } from '../cmps/Chat';

export const Room = () => {
  const { currRoom } = useSelector((state) => state.roomModule);
  const { loggedInUser, guestUser } = useSelector((state) => state.userModule);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    //5 renders for some reason...
    dispatch(setCurrRoomById(id));
    if (currRoom) {
      const topicToWatch = currRoom.topic + currRoom._id;
      socketService.on('set-room-socket', topicToWatch);
      socketService.on('room watch', topicToWatch);
      socketService.on('room topic', topicToWatch);
    }
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
      {(loggedInUser || guestUser) && <Chat />}
    </div>
  );
};
