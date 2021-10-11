import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrRoom } from '../store/actions/roomActions';
import { RoomPreview } from './RoomPreview';
export const RoomList = ({ rooms }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const routeToRoom = (room) => {
    dispatch(setCurrRoom(room));
    history.push(`/rooms/${room._id}`);
  };
  return (
    <div className="rooms-list">
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>topic</th>
            <th>type</th>
            <th>Limit</th>
            <th>Restrictions</th>
            <th>last Message</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => {
            return (
              <tr key={room._id} onClick={() => routeToRoom(room)}>
                <RoomPreview room={room} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
