import React, { useState } from 'react';
import { RoomPreview } from './RoomPreview';
import { getLoggedinUser } from '../store/actions/userActions';
import { CreateRoom } from './CreateRoom';
export const RoomList = ({ rooms }) => {
  const [showRoomEdit, setShowRoomEdit] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);

  const getRoomId = (roomId) => {
    const room = rooms.find((room) => room._id === roomId);
    setRoomToEdit(room);
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => {
            return (
              <tr key={room._id}>
                <RoomPreview
                  room={room}
                  user={getLoggedinUser()}
                  exit={setShowRoomEdit}
                  getRoomId={getRoomId}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
      {showRoomEdit && (
        <CreateRoom
          exit={setShowRoomEdit}
          user={getLoggedinUser()}
          room={roomToEdit}
        />
      )}
    </div>
  );
};
