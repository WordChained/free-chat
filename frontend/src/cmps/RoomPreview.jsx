import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import edit from '../assets/imgs/edit-large.png';
import removeIcon from '../assets/imgs/remove.png';
import add from '../assets/imgs/add.png';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrRoom, remove, query } from '../store/actions/roomActions';
import { update, getUserById } from '../store/actions/userActions';
export const RoomPreview = ({ room, user, exit, getRoomId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const editRoom = () => {
    exit(true);
    getRoomId(room._id);
    dispatch(query());
  };

  const routeToRoom = () => {
    console.log('route');
    dispatch(setCurrRoom(room));
    history.push(`/rooms/${room._id}`);
  };

  const toggleToLiked = () => {
    if (user.likedRooms.includes(room._id)) {
      console.log('remove');
      user.likedRooms = user.likedRooms.filter((r) => r !== room._id);
      dispatch(update(user));
      dispatch(getUserById(user._id));
    } else {
      user.likedRooms = [...user.likedRooms, room._id];
      dispatch(update(user));
      dispatch(getUserById(user._id));
    }
    dispatch(query());
  };

  const removeRoomBtn = () => {
    const confirms = window.confirm(
      `Are you sure you want to remove the room ${room.name} and all it's content?`
    );
    if (confirms) {
      dispatch(remove(room._id));
      //remove the room id from likedRooms in the user
      user.likedRooms = user.likedRooms.filter((r) => r !== room._id);
      dispatch(update(user));
      dispatch(getUserById(user._id));
      dispatch(query());
    }
  };
  return (
    <Fragment>
      <td className="room-name" onClick={routeToRoom}>
        <Link to={`rooms/${room._id}`}>{room.name}</Link>
      </td>
      <td>{room.topic}</td>
      <td>{room.type}</td>
      <td>{room.limit}</td>
      <td>
        {room.restrictions.length ? room.restrictions.join(', ') : 'none'}
      </td>
      <td>
        <span>some date</span>
      </td>
      <td className="actions">
        <img src={edit} alt="edit-btn" onClick={editRoom} />
        <img
          onClick={toggleToLiked}
          className={user.likedRooms.includes(room._id) ? 'liked' : ''}
          src={add}
          alt="add-btn"
        />
        {room.owner._id === user._id && (
          <img
            onClick={removeRoomBtn}
            className="remove"
            src={removeIcon}
            alt="remove-btn"
          />
        )}
      </td>
    </Fragment>
  );
};
