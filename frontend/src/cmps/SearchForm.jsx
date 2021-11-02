import React, { FormEvent } from 'react';

// import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
// import makeAnimated from 'react-select/animated';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { socketService } from '../services/socketService';
import { useDispatch } from 'react-redux';
import { setCurrPrivateRoom } from '../store/actions/roomActions';
import { getEmptyPrivateRoom } from '../services/roomService';
export const SearchForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const options = [
    { value: 'music', label: 'Music' },
    { value: 'food', label: 'Food' },
    { value: 'video games', label: 'Video Games' },
    { value: 'code', label: 'Code' },
    { value: 'love', label: 'Love' },
    { value: 'art', label: 'Art' },
  ];
  const [showTopics, setShowTopics] = useState(false);
  const [topics, setTopics] = useState([]);

  const handleChange = (newValue, actionMeta) => {
    console.log('new value:', newValue);
    console.log(`action: ${actionMeta.action}`);
    setTopics([...newValue]);
  };
  const search = (ev) => {
    ev.preventDefault();
    //if its topics and there are no topics, dont search
    if (showTopics && !topics.length) {
      console.log('Please pick at least one topic');
      //need to add user message here
      return;
    }
    console.log('topics:', topics);
    topics.map((topic) => console.log(topic.value));
    const privateRoom = getEmptyPrivateRoom();
    privateRoom.topics = topics;
    dispatch(setCurrPrivateRoom(privateRoom));
    // storageService.store('topics', topics);
    sessionStorage.setItem('topics', JSON.stringify(topics));
    // socketService.on()
    history.push('/free-chat');
  };

  return (
    <div>
      <form onSubmit={search}>
        <div className="radio-btns">
          <div>
            <input
              name="chat-type"
              id="free-search"
              type="radio"
              value="free-search"
              onChange={() => setShowTopics(false)}
              checked={!showTopics}
            />
            <label htmlFor="free-search">
              <span className={!showTopics ? 'checked' : ''}>Free Search</span>
            </label>
          </div>
          <div>
            <input
              name="chat-type"
              id="topics"
              type="radio"
              value="topics"
              onChange={() => setShowTopics(true)}
            />
            <label htmlFor="topics">
              <span className={showTopics ? 'checked' : ''}>
                Search people by topics
              </span>
            </label>
          </div>
        </div>

        {showTopics && (
          <CreatableSelect
            id="select-topic"
            className="select-Private-topics"
            isMulti
            options={options}
            onChange={handleChange}
            // components={animatedComponents}
          />
        )}
        <button type="submit">Search for a chat</button>
      </form>
    </div>
  );
};
