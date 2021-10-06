import React from 'react';
import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';

import { UserBiography } from '../cmps/UserBiography';

import { ProfileImage } from '../cmps/ProfileImage';
import pin from '../assets/imgs/pin.png';

export const UserProfile = () => {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const { userName, fullName, email } = loggedInUser;

  const firstLetter = fullName.charAt(0).toUpperCase();
  const restOfName = fullName.slice(1, fullName.indexOf(' '));
  const capitalizedFullName = firstLetter + restOfName;

  return (
    <section className="user-profile">
      <h4> Hello {capitalizedFullName}, This is your profile page. </h4>
      <ProfileImage />

      <div className="additional-info">
        <ul>
          <div className="forty-five"></div>
          <br />
          <img className="pin" src={pin} alt="pin" />
          <li>User Name: {userName}</li>
          {loggedInUser && <li>Email: {email}</li>}
          <li>
            Been a user since:{' '}
            {new Date(loggedInUser.createdAt * 1000).toLocaleDateString(
              'he-IL'
            )}
          </li>
          <li>Tattoos saved: {loggedInUser.tattoos.length}</li>
        </ul>
      </div>
      <UserBiography />
      {/* <li>
          <h5>Delete Account:</h5>
          <button>Delete</button>
        </li> */}
    </section>
  );
};
