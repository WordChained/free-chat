import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { login } from '../store/actions/userActions';

import closedEye from '../assets/imgs/closed-eye.png';
import openEye from '../assets/imgs/open-eye.png';

export const Login = ({ close, onSignupLink }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { loggedInUser, wrongPassword, wrongEmail } = useSelector(
    (state) => state.userModule
  );

  const onSubmit = (data) => {
    const validation = /^[^<>%$]*$/;
    if (!validation.test(data.password) || !validation.test(data.email)) {
      setError("Don't use the following charaters: ^,<,>,%,$");
      return;
    }
    dispatch(login(data.email.trim(), data.password.trim()));
    // close();
  };
  useEffect(() => {
    if (loggedInUser !== null) {
      setError('');
      close();
    }
    //eslint-disable-next-line
  }, [loggedInUser]);

  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (wrongPassword) {
      setError('Wrong Password');
    } else if (wrongEmail) {
      setError('Wrong email. try again or signup');
    }
  }, [wrongPassword, wrongEmail]);

  const toggleShowPassword = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    setShow(!show);
  };
  return (
    <section className="screen-cover">
      <div className="login-container">
        <button onClick={close} className="close">
          X
        </button>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={wrongEmail ? 'wrong' : ''}
            {...register('email')}
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <div className="passwords-container">
            <input
              className={wrongPassword ? 'wrong' : ''}
              {...register('password')}
              type={show ? 'text' : 'password'}
              name="password"
              required
              placeholder="Enter your password"
            />
            <button
              className="show-pasword-btn"
              onClick={(ev) => toggleShowPassword(ev)}
            >
              <img
                className="show-password"
                src={show ? openEye : closedEye}
                alt="closedEye"
              />
            </button>
          </div>
          <input type="submit" value="Log In" />
        </form>
        {/* <button>Google</button> */}
        {error && <div>*{error}</div>}
        <p>
          not a member yet?{' '}
          <span className="link" onClick={onSignupLink}>
            signup!
          </span>
        </p>
      </div>
    </section>
  );
};
