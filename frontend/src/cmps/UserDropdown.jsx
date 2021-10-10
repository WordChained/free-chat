import React from 'react';
import { Link } from 'react-router-dom';

//imgs or icons:
import setting from '../assets/imgs/setting.png';
import logoutIcon from '../assets/imgs/logout.png';
import defaultUser from '../assets/imgs/tattoo-male.png';

import { useState, useRef } from 'react';
export const UserDropdown = ({ user, logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const ref = useRef();
  //this closes the dropdown when i click outside the div/not on the settings button
  document.body.addEventListener('click', (ev) => {
    const cogWheel = document.querySelector('.corgwheel');
    if (!ref.current) return;
    ev.stopPropagation();
    const dropdown = ref.current;
    const isClickedInside = dropdown.contains(ev.target);
    if (ev.target !== cogWheel && !isClickedInside) {
      closeDropdown();
    }
  });
  return (
    <section className="user-dropdown">
      {/* <pre>{user}</pre> */}
      <div>Hello {user.userName}!</div>
      <img
        className="header-user-img"
        src={user.userImg ? user.userImg : defaultUser}
        alt="userImg"
      />
      <img
        className="corgwheel"
        onClick={() => toggleDropdown()}
        src={setting}
        alt="corgwheel"
      />
      {showDropdown && (
        <section ref={ref} tabIndex="-1" className="dropdown">
          <Link
            className="item"
            onClick={closeDropdown}
            to={`/myProfile/${user.userName}`}
          >
            My Profile
          </Link>

          <Link className="item" onClick={closeDropdown} to="/myTattoos">
            My List
          </Link>

          <div className="item" onClick={logout}>
            <span>Logout</span>
            <img src={logoutIcon} alt="lgout-icon" />
          </div>
        </section>
      )}
    </section>
  );
};
