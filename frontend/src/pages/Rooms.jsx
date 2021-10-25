import { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';
import Select from 'react-select';

import { query, setFilterBy, setTags } from '../store/actions/roomActions';

import { RoomList } from '../cmps/RoomList';

export const Rooms = memo(() => {
  const { rooms, filterBy, filteredRooms } = useSelector(
    (state) => state.roomModule
  );
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

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
    console.log('tags:', tags);
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
    <div>
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
      <RoomList rooms={filteredRooms ? filteredRooms : rooms} />
    </div>
  );
});
