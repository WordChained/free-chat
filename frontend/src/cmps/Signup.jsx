import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { signup } from '../store/actions/userActions';
import closedEye from '../assets/imgs/closed-eye.png';
import openEye from '../assets/imgs/open-eye.png';
import { useRef } from 'react';

export const Signup = ({ close, onLoginLink }) => {
  const {
    register,
    handleSubmit,
    // getValues
  } = useForm();

  const dispatch = useDispatch();
  const { loggedInUser, isUser } = useSelector((state) => state.userModule);
  const pass = useRef({});

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [show, setShow] = useState(false);

  //useState:
  // const passwordValidation = getValues(['password']);
  // const passwordValidationVer = getValues(['passwordVer']);
  const [error, setError] = useState('');

  const onSubmit = (data) => {
    const validation = /^[^<>%$]*$/;
    if (
      !validation.test(data.password) ||
      !validation.test(data.email) ||
      !validation.test(data.userName) ||
      !validation.test(data.fullName)
    ) {
      setError("Don't use the following charaters: ^,<,>,%,$");
      return;
    } else if (data.password === data.passwordVer) {
      // console.log('password', data.password);
      // console.log('data', data);
      setPasswordMatch(true);
      setError('');
      dispatch(signup(data));
      // dispatch(login(data.email, data.password));
      if (isUser) {
        setError('Email is already in use. forgot password?');
      } else {
        close();
        // window.location.reload(false);
      }
    } else {
      console.log("Passwords don't match!");
      setError("Passwords don't match!");
      setPasswordMatch(false);
    }
  };

  const toggleShowPassword = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    setShow(!show);
  };
  useEffect(() => {
    if (loggedInUser !== null) {
      close();
    }
    //eslint-disable-next-line
  }, [loggedInUser]);

  return (
    <section className="screen-cover">
      <div className="signup-container">
        <button onClick={close} className="close">
          X
        </button>
        <h3>SIGNUP</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            required
            {...register('userName')}
            type="text"
            className="userName"
            placeholder="Choose a user name"
          />
          <input
            required
            {...register('fullName')}
            type="text"
            className="fullName"
            placeholder="Your full name"
          />
          <select required {...register('sex')} name="sex" id="sex">
            <option selected disabled value="">
              Sex
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            required
            {...register('birthday')}
            type="date"
            name="birthday"
          />
          <input
            required
            {...register('email')}
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <div className="passwords-container">
            <input
              className={passwordMatch ? '' : 'wrong'}
              required
              {...register('password')}
              type={show ? 'text' : 'password'}
              name="password"
              minLength="6"
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
          <div className="passwords-container">
            <input
              className={passwordMatch ? '' : 'wrong'}
              required
              {...register('passwordVer')}
              type={show ? 'text' : 'password'}
              name="passwordVer"
              placeholder="Verify your password"
              minLength="6"
              ref={pass}
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
          <input type="submit" value="signup" />
          {error && <div>*{error}</div>}
          {isUser && <div>*This email is already in use</div>}
        </form>
        <p>
          Already a member?{' '}
          <span className="link" onClick={onLoginLink}>
            login
          </span>
        </p>
      </div>
    </section>
  );
};
