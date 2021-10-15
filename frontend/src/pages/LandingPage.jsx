import React, { useState } from 'react';

import { Login } from '../cmps/Login';
import { Signup } from '../cmps/Signup';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../store/actions/userActions';
export const LandingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLoginLink = () => {
    setShowLogin(true);
    setShowSignup(false);
  };
  const onSignupLink = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const closeLogin = () => setShowLogin(false);
  const closeSignup = () => setShowSignup(false);

  const enterAsGuest = () => {
    dispatch(login({}, true));
    history.replace('/');
  };
  return (
    <div className="landing-page">
      <div className="greeting">
        <h1>Welcome to FreeChat!</h1>
      </div>
      {showSignup && <Signup close={closeSignup} onLoginLink={onLoginLink} />}
      {showLogin && <Login close={closeLogin} onSignupLink={onSignupLink} />}
      <div className="enter-as-guest">
        <p>Or Start chatting as a guest</p>
        <button onClick={enterAsGuest}>Let's Go!</button>
      </div>
    </div>
  );
};
