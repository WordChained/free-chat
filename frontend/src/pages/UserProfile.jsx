import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';

import pin from '../assets/imgs/pin.png';
import { getLoggedinUser } from '../store/actions/userActions';
export const UserProfile = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(getLoggedinUser());
    console.log('user in userProfile:', user);
  }, []);

  const { userName, fullName, email } = user;
  const getCaptName = () => {
    const firstLetter = fullName.charAt(0).toUpperCase();
    const restOfName = fullName.slice(1, user.fullName.indexOf(' '));
    const capitalizedFullName = firstLetter + restOfName;
    return capitalizedFullName;
  };

  if (!user) return <div>no logged in user</div>;
  return (
    <section className="user-profile">
      <h4> Hello {getCaptName()}, This is your profile page. </h4>

      <div className="additional-info">
        <ul>
          <div className="forty-five"></div>
          <br />
          <img className="pin" src={pin} alt="pin" />
          <li>User Name: {userName}</li>
          {user && <li>Email: {email}</li>}
          <li>
            Been a user since:{' '}
            {new Date(user.createdAt * 1000).toLocaleDateString('he-IL')}
          </li>
        </ul>
      </div>
      {/* <li>
          <h5>Delete Account:</h5>
          <button>Delete</button>
        </li> */}
    </section>
  );
};
