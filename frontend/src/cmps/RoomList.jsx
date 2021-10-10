import React from 'react';
import { RoomPreview } from './RoomPreview';
export const RoomList = ({ rooms }) => {
  return (
    <div>
      {rooms.map((room) => {
        return <RoomPreview room={room} key={room._id} />;
      })}
    </div>
  );
};
