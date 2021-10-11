import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const RoomPreview = ({ room }) => {
  return (
    <Fragment>
      <td className="room-preview">
        <Link to={`rooms/${room._id}`}>{room.name}</Link>
      </td>
      <td>{room.topic}</td>
      <td>{room.type}</td>
      <td>{room.limit}</td>
      <td>{room.restrictions.join(', ')}</td>
      <td>
        <span>some date</span>
      </td>
    </Fragment>
  );
};
