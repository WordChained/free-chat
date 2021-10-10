import React from 'react';
import { RoomList } from '../cmps/RoomList';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { query } from '../store/actions/roomActions';

export const Rooms = () => {
  const { rooms, filterBy } = useSelector((state) => state.roomModule);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(query(filterBy.name));
  }, []);

  // const getRooms = () => {
  //   dispatch(query(filterBy));
  // };

  return (
    <div>
      <RoomList rooms={rooms} />
    </div>
  );
};
