import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  NavLink,
  useHistory,
  // useParams,
  // useLocation,
  // useRouteMatch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Signup } from '../cmps/Signup';
import { Login } from '../cmps/Login';
import { UserDropdown } from '../cmps/UserDropdown';

import { logout } from '../store/actions/userActions';
import { useDispatch } from 'react-redux';

import logo from '../assets/imgs/tattoo-logo.png';

export const AppHeader = () => {
  const { loggedInUser } = useSelector((state) => state.userModule);
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
    history.push('/');
  };
  return (
    <section className="app-header">
      <nav className="main-nav">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        |
        <div className="navigation-btns">
          <button onClick={() => history.goBack()}>⬅</button>
          <button onClick={() => history.goForward()}>➡</button>{' '}
        </div>
        <span> | </span>
        <NavLink
          className="home-link"
          activeClassName="active-nav"
          exact
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="about-link"
          activeClassName="active-nav"
          exact
          to="/about"
        >
          About
        </NavLink>
        {loggedInUser && (
          <NavLink
            className="my-tattoos-link"
            activeClassName="active-nav"
            to="/myTattoos"
          >
            My List
          </NavLink>
        )}
        <div className="user-links">
          {loggedInUser && (
            <UserDropdown user={loggedInUser} logout={onLogout} />
          )}
          {!loggedInUser && (
            <span onClick={() => setShowLogin(true)}>Login</span>
          )}
          {!loggedInUser && '|'}
          {!loggedInUser && (
            <span onClick={() => setShowSignup(true)}>Signup</span>
          )}
        </div>
        {showSignup && <Signup close={closeSignup} onLoginLink={onLoginLink} />}
        {showLogin && <Login close={closeLogin} onSignupLink={onSignupLink} />}
      </nav>
    </section>
  );
};
