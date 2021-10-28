import { useEffect, useState } from 'react';

import { getEmptyRoom } from '../services/roomService';

export const CreateRoom = ({ exit }) => {
  const [open, setOpen] = useState(true);
  const [emptyRoom, setEmptyRoom] = useState(null);

  useEffect(() => {
    setEmptyRoom(getEmptyRoom());
  }, []);

  console.log(emptyRoom);
  const closeWindow = () => {
    setOpen(false);
    setTimeout(() => {
      //time for the animation to work
      exit(false);
    }, 300);
  };
  return (
    <div className="screen-cover">
      <div className={`create-room ${open ? '' : 'closing'} `}>
        <button className="close" onClick={closeWindow}>
          X
        </button>
        <h4>Create a Room</h4>
        <form action="">
          <input type="text" placeholder="Room Name" />
          <input type="text" placeholder="Room Name" />
          <input type="number" placeholder="Room limit" defaultValue="none" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Room Description"
          />
          <div className="topic-list">
            <label htmlFor="topic-list">Topic list:</label>
            <select name="topic-list" id="" placeholder="Topic">
              <option value="music">Music</option>
              <option value="art">Art</option>
              <option value="love">Love</option>
            </select>
          </div>
          <button type="submit">Create room!</button>
        </form>
      </div>
    </div>
  );
};
