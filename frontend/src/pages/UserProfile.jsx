import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';

// import pin from '../assets/imgs/pin.png';
import { getLoggedinUser } from '../store/actions/userActions';
export const UserProfile = () => {
  const [user, setUser] = useState('');
  const [userImg, setUserImg] = useState('');
  const { users } = useSelector((state) => state.userModule);
  useEffect(() => {
    setUser(getLoggedinUser());
    getUserImg();
    console.log('user in userProfile:', user);
    //eslint-disable-next-line
  }, []);

  const { userName, fullName, email } = user;
  const getCaptName = () => {
    const firstLetter = fullName.charAt(0).toUpperCase();
    const restOfName = fullName.slice(1, user.fullName.indexOf(' '));
    const capitalizedFullName = firstLetter + restOfName;
    return capitalizedFullName;
  };
  const getUserImg = () => {
    const userInSession = getLoggedinUser();
    const correctUser = users.find((u) => {
      return u._id === userInSession._id;
    });
    console.log('correctUser', correctUser);
    setUserImg(correctUser.imgUrl);
  };

  if (!user) return <div>no logged in user</div>;
  return (
    <section className="user-profile">
      <h4> Hello {getCaptName()}, This is your profile page. </h4>
      <img src={userImg} alt="userImg" />
      <div className="additional-info">
        <ul>
          <div className="forty-five"></div>
          <br />
          {/* <img className="pin" src={pin} alt="pin" /> */}
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
