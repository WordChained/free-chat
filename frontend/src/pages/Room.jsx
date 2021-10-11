import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { setCurrRoom, getById } from '../store/actions/roomActions';
export const Room = () => {
  const { currRoom } = useSelector((state) => state.roomModule);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getById(id));
  }, []);
  const exitRoom = () => {
    history.goBack();
    dispatch(setCurrRoom(null));
  };
  //need to add a loader
  if (!currRoom)
    return (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  return (
    <div>
      {/* <Link to={`/rooms`} replace>
        All rooms
      </Link> */}
      <button onClick={exitRoom}>Back</button>
      <h3>{currRoom.name}</h3>
    </div>
  );
};
