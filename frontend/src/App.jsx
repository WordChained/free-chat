import './style/App.scss';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { AppFooter } from './cmps/AppFooter';
import { AppHeader } from './cmps/AppHeader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getLoggedinUser,
  persistLogin,
  setReady,
  getUsers,
} from './store/actions/userActions';

import { About } from './pages/About';
import { Rooms } from './pages/Rooms';
import { Room } from './pages/Room';
import { LandingPage } from './pages/LandingPage';
import { UserProfile } from './pages/UserProfile';

function App() {
  const dispatch = useDispatch();
  const { loggedInUser, ready, guestUser } = useSelector(
    (state) => state.userModule
  );

  useEffect(() => {
    dispatch(getUsers());
    const user = getLoggedinUser();
    if (user) {
      dispatch(persistLogin(user));
      dispatch(setReady(true));
    } else {
      dispatch(setReady(true));
    }
    //eslint-disable-next-line
  }, []);

  const PrivateRoute = (props) => {
    // return props.isAdmin ? <Route {...props} /> : <Redirect to="/" />
    return getLoggedinUser() ? (
      <Route path={props.path} component={props.component} />
    ) : (
      <Redirect to="/:landingPage" />
    );
  };

  const NoneUsers = (props) => {
    // return props.isAdmin ? <Route {...props} /> : <Redirect to="/" />
    return !getLoggedinUser() ? (
      <Route path={props.path} component={props.component} />
    ) : (
      <Redirect to="/" />
    );
  };

  const RegisteredUserRoute = (props) => {
    // return props.isAdmin ? <Route {...props} /> : <Redirect to="/" />
    return loggedInUser ? (
      <Route path={props.path} component={props.component} />
    ) : (
      <Redirect to="/:landingPage" />
    );
  };

  if (!ready)
    return (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  else
    return (
      <Router>
        {(loggedInUser || guestUser) && <AppHeader />}
        <main className="App">
          <Switch>
            {/* <PrivateRoute path="/rooms/:id" component={Room} /> */}
            <PrivateRoute path="/rooms/:id" component={Room} />
            <PrivateRoute path="/rooms" component={Rooms} />
            <PrivateRoute path="/about" component={About} />
            <RegisteredUserRoute
              path="/myProfile/:id"
              component={UserProfile}
            />
            <NoneUsers path="/:landingPage" component={LandingPage} />
            <PrivateRoute path="/" component={MainPage} />
          </Switch>
        </main>
        {(loggedInUser || guestUser) && <AppFooter />}
      </Router>
    );
}

export default App;
