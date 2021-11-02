import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';
import Select from 'react-select';
import create from '../assets/imgs/create.png';

import { query, setFilterBy, setTags } from '../store/actions/roomActions';

import { RoomList } from '../cmps/RoomList';
import { CreateRoom } from '../cmps/CreateRoom';
import { getLoggedinUser } from '../store/actions/userActions';
export const Rooms = memo(() => {
  const { rooms, filterBy, filteredRooms } = useSelector(
    (state) => state.roomModule
  );
  const { loggedInUser, guestUser } = useSelector((state) => state.userModule);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [showRoomCreation, setShowRoomCreation] = useState(false);
  useEffect(() => {
    dispatch(query(filterBy));
    // eslint-disable-next-line
  }, [filterBy]);

  const onSubmit = (data) => {
    dispatch(setFilterBy(data['search-rooms']));
    // console.log(data['tags']);
    // if (data['tags'].length) dispatch(setTags(data['tags']));
  };
  const onTagsSubmit = (tags) => {
    dispatch(setTags(tags));
  };

  const options = [
    { value: '', label: 'Choose Tags' },
    { value: 'music', label: 'Music' },
    { value: 'food', label: 'Food' },
    { value: 'video games', label: 'Video Games' },
    { value: 'code', label: 'Code' },
    { value: 'love', label: 'Love' },
    { value: 'art', label: 'Art' },
  ];

  if (!rooms)
    return (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  return (
    <div className="rooms-page">
      <div className="forms">
        <form
          className="free-search-form"
          onSubmit={handleSubmit(onTagsSubmit)}
          onChange={debounce(handleSubmit(onSubmit), 700)}
        >
          <input
            {...register('search-rooms')}
            id="search-rooms"
            type="text"
            placeholder="Search By Name"
            autoComplete="off"
          />
        </form>
        <form className="tags-form">
          <Select
            isMulti
            name="tags"
            options={options}
            placeholder="Narrow Results by Tags"
            // className="basic-multi-select"
            // classNamePrefix="select"
            onChange={onTagsSubmit}
          />
        </form>
      </div>
      <button
        className="create-room-btn"
        onClick={() => setShowRoomCreation(!showRoomCreation)}
      >
        <span>Create a Room</span>
        <img src={create} alt="create" />
      </button>
      {showRoomCreation && (
        <CreateRoom exit={setShowRoomCreation} user={getLoggedinUser()} />
      )}
      <RoomList rooms={filteredRooms ? filteredRooms : rooms} />
    </div>
  );
});
