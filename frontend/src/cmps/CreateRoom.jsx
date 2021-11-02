import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getEmptyRoom } from '../services/roomService';
import CreatableSelect from 'react-select/creatable';

import { query, save } from '../store/actions/roomActions';
import { getUserById, update } from '../store/actions/userActions';

export const CreateRoom = ({ exit, user, room }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const { rooms } = useSelector((state) => state.roomModule);

  const [open, setOpen] = useState(true);
  const [emptyRoom, setEmptyRoom] = useState(null);
  const [tags, setTags] = useState([]);
  const [restrictions, setRestricitons] = useState([]);
  const [roomImgPreview, setRoomImgPreview] = useState(null);
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    setEmptyRoom(getEmptyRoom());
    // dispatch(getUserById(user._id));
    //eslint-disable-next-line
  }, []);

  // const getCaptInitial = (word) => {
  //   console.log('word:', word);
  //   if (!word || !word.length) return;
  //   console.log('passed!');
  //   const firstLetter = word.charAt(0);
  //   const restOfWord = word.slice(1, word.length);
  //   return firstLetter.toUpperCase() + restOfWord;
  // };

  const handleChange = (newValue, actionMeta) => {
    // console.log('new value:', newValue);
    // console.log(`action: ${actionMeta.action}`);
    newValue.map((v) => {
      if (!v.value) return;
      return setTags([...tags, v.value]);
    });
  };
  const handleChange2 = (newValue, actionMeta) => {
    console.log('new value:', newValue);
    console.log(`action: ${actionMeta.action}`);
    newValue.map((v) => {
      if (!v.value) return;
      return setRestricitons([...restrictions, v.value]);
    });
    // newValue.map((val) => console.log(val.value));
  };

  const closeWindow = () => {
    setOpen(false);
    setTimeout(() => {
      //time for the animation to work
      exit(false);
    }, 300);
  };
  const options = [
    { value: 'music', label: 'Music' },
    { value: 'food', label: 'Food' },
    { value: 'video games', label: 'Video Games' },
    { value: 'code', label: 'Code' },
    { value: 'love', label: 'Love' },
    { value: 'art', label: 'Art' },
  ];
  const restrictionsOptions = [
    { value: '18+', label: '18+' },
    { value: 'senior-member', label: 'senior-member' },
    { value: 'password', label: 'password' },
  ];
  const addImageFromUser = async (event) => {
    const files = event.target.files;
    console.log('files.length:', files.length);
    setRoomImgPreview(null);
    if (!files.length) return;
    // console.log('all files:', files);
    const file = event.target.files[0];
    const validFileType = /\.(jpe?g|tiff?|png|webp|bmp)$/i.test(file.name);
    if (!validFileType) return;
    console.log('file:', file);
    setRoomImgPreview(file);
  };

  useEffect(() => {
    readImg();
    //eslint-disable-next-line
  }, [roomImgPreview]);

  const onSubmit = (data) => {
    console.log('room:', room);
    const newRoom = {
      name: data['room-name'],
      createdAt: emptyRoom.createdAt,
      imgUrl: data['room-image'],
      likedByUsers: [emptyRoom.owner._id], //adding the current user automatically
      limit: data['room-limit'],
      msgs: [],
      owner: emptyRoom.owner,
      tags,
      topic: data['room-topic'],
      type: +data['room-limit'] > 2 ? 'group' : 'private',
      description: data['room-desc'],
      restrictions,
    };
    reset();
    if (room) newRoom['_id'] = room._id;
    dispatch(save(newRoom));
    setTimeout(() => {
      dispatch(query());
    }, 1000);
    setCurrUser(JSON.parse(JSON.stringify(user)));
    closeWindow();
  };
  useEffect(() => {
    if (!currUser || !rooms[rooms.length - 1]._id) return;
    currUser.likedRooms = [...currUser.likedRooms, rooms[rooms.length - 1]._id];
    dispatch(update(currUser));
    dispatch(getUserById(user._id));
    dispatch(query());
    console.log('rooms.length', rooms.length);
    //eslint-disable-next-line
  }, [rooms.length]);

  const readImg = () => {
    let reader = new FileReader();
    const preview = document.querySelector('.room-image-preview');
    reader.onload = () => {
      preview.src = reader.result;
    };
    if (roomImgPreview) {
      preview.src = reader.readAsDataURL(roomImgPreview);
    } else {
      preview.src = '';
    }
  };
  return (
    <div className="screen-cover">
      <div className={`create-room ${open ? '' : 'closing'} `}>
        <button className="close" onClick={closeWindow}>
          X
        </button>
        <h4>Create a Room</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('room-name')}
            type="text"
            placeholder="Room Name"
            required
            defaultValue={room ? room.name : ''}
          />
          <input
            required
            {...register('room-topic')}
            type="text"
            placeholder="Room topic"
            defaultValue={room ? room.topic : ''}
          />
          <input
            {...register('room-image')}
            type="file"
            placeholder="Room topic"
            className="room-image-input"
            onChange={(ev) => addImageFromUser(ev)}
            //need to upload image to mongo and figure out how to read it. this pops an error since it's not saved as a file
            // defaultValue={room ? room.imgUrl : ''}
          />
          <img
            src={room ? room.imgUrl : ''}
            alt="room"
            className={'room-image-preview'}
            style={{
              display:
                roomImgPreview || (room && room.imgUrl) ? 'block' : 'none',
            }}
          />
          <select
            {...register('room-limit')}
            type="number"
            placeholder="Room limit"
            defaultValue={room ? room.limit : 'none'}
            className="limit-input"
          >
            <option defaultValue value="none">
              none
            </option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="50">50</option>
            <option value="80">80</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="300">300</option>
          </select>
          <textarea
            {...register('room-desc')}
            cols="30"
            rows="10"
            placeholder="Room Description"
            className="room-desc-textarea"
            defaultValue={room ? room.description : ''}
          />
          <div className="tags-list">
            <CreatableSelect
              {...register('room-tags')}
              name="tags-list"
              id="select-tags"
              className="select-tags"
              isMulti
              options={options}
              onChange={handleChange}
              placeholder="Select tags"
              defaultValue={
                room && room.tags.length
                  ? room.tags.map((tag) => {
                      return {
                        value: tag,
                        label: tag,
                      };
                    })
                  : ''
              }
              // components={animatedComponents}
            />
            <CreatableSelect
              //need to add a defence about unknown restrictions, when creating room!
              {...register('room-restricitons')}
              name="restrictions-list"
              id="select-restrictions"
              className="select-restrictions"
              isMulti
              options={restrictionsOptions}
              onChange={handleChange2}
              placeholder="Select restrictions"
              defaultValue="none"
              defaultValue={
                room && room.restrictions.length
                  ? room.restrictions.map((restriction) => {
                      return {
                        value: restriction,
                        label: restriction,
                      };
                    })
                  : ''
              }
              // components={animatedComponents}
            />
          </div>
          <button type="submit">{room ? 'update room' : 'Create room!'}</button>
        </form>
      </div>
    </div>
  );
};
