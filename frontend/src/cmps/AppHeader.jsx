import React from 'react';
import { useState, useEffect } from 'react';
import {
  Link,
  NavLink,
  useHistory,
  // useParams,
  // useLocation,
  // useRouteMatch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Signup } from './Signup';
import { Login } from './Login';
import { UserDropdown } from '../cmps/UserDropdown';

import { logout } from '../store/actions/userActions';
import { useDispatch } from 'react-redux';

import logo from '../assets/imgs/chat-logo.png';

export const AppHeader = () => {
  const { loggedInUser, guestUser } = useSelector((state) => state.userModule);
  const history = useHistory();
  const dispatch = useDispatch();

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const closeLogin = () => setShowLogin(false);
  const closeSignup = () => setShowSignup(false);

  const onLoginLink = () => {
    setShowLogin(true);
    setShowSignup(false);
  };
  const onSignupLink = () => {
    setShowLogin(false);
    setShowSignup(true);
  };
  // const params = useParams();
  // console.log(params);

  const onLogout = () => {
    dispatch(logout());
    history.push('/:landing-page');
  };
  return (
    <section className="app-header">
      <nav className="main-nav">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <span> | </span>
        <NavLink
          className="home-link"
          activeClassName="active-nav"
          exact
          to="/"
        >
          Home
        </NavLink>
        <span> | </span>
        <NavLink
          className="about-link"
          activeClassName="active-nav"
          exact
          to="/about"
        >
          About
        </NavLink>
        <span> | </span>
        <NavLink
          className="Rooms-link"
          activeClassName="active-nav"
          exact
          to="/rooms"
        >
          Rooms
        </NavLink>
        <div className={`user-links ${guestUser ? 'guest' : ''}`}>
          {(loggedInUser || guestUser) && (
            <UserDropdown
              user={loggedInUser ? loggedInUser : guestUser}
              logout={onLogout}
            />
          )}
          <div className="reg-btns">
            {!loggedInUser && (
              <span onClick={() => setShowLogin(true)}>Login</span>
            )}
            {!loggedInUser && '|'}
            {!loggedInUser && (
              <span onClick={() => setShowSignup(true)}>Signup</span>
            )}
          </div>
        </div>
        {showSignup && <Signup close={closeSignup} onLoginLink={onLoginLink} />}
        {showLogin && <Login close={closeLogin} onSignupLink={onSignupLink} />}
      </nav>
    </section>
  );
};
