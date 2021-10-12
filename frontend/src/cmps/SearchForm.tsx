import React, { FormEvent } from 'react';

// import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
// import makeAnimated from 'react-select/animated';
import { ActionMeta, OnChangeValue } from 'react-select';

import { useState } from 'react';

export const SearchForm = () => {
  interface Option {
    value: string;
    label: string;
  }
  interface keyable {
    [key: string]: any;
  }
  // const animatedComponents = makeAnimated();

  const options: Option[] = [
    { value: 'music', label: 'Music' },
    { value: 'food', label: 'Food' },
    { value: 'video games', label: 'Video Games' },
    { value: 'code', label: 'Code' },
    { value: 'love', label: 'Love' },
    { value: 'art', label: 'Art' },
  ];
  const [showTopics, setShowTopics] = useState(false);
  const [topics, setTopics] = useState<keyable[]>([]);

  const handleChange = (
    newValue: OnChangeValue<Option, true>,
    actionMeta: ActionMeta<Option>
  ) => {
    console.log('new value:', newValue);
    console.log(`action: ${actionMeta.action}`);
    setTopics([...newValue]);
  };
  const search = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    //if its topics and there are no topics, dont search
    if (showTopics && !topics.length) {
      console.log('Please pick at least one topic');
      //need to add user message here
      return;
    }
    console.log('topics:', topics);
    topics.map((topic) => console.log(topic.value));
  };

  // const setChatType = (ev: ChangeEvent<HTMLInputElement>): string => {
  //   console.log('value:', ev.target.value);
  //   if (ev.target.value === 'free-search') setShowTopics(false);
  //   else setShowTopics(true);
  //   return;
  // };
  return (
    <div>
      <form onSubmit={search}>
        <div>
          <input
            name="chat-type"
            id="free-search"
            type="radio"
            value="free-search"
            onChange={() => setShowTopics(false)}
            checked={!showTopics}
          />
          <label htmlFor="free-search"> Free Search</label>
        </div>
        <div>
          <input
            name="chat-type"
            id="topics"
            type="radio"
            value="topics"
            onChange={() => setShowTopics(true)}
          />
          <label htmlFor="topics"> Search people by topics</label>
        </div>

        {showTopics && (
          <CreatableSelect
            id="select-topic"
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
