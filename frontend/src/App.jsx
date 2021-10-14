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
  login,
  getLoggedinUser,
  persistLogin,
  setReady,
} from './store/actions/userActions';

import { About } from './pages/About';
import { Rooms } from './pages/Rooms';
import { Room } from './pages/Room';
import { LandingPage } from './pages/LandingPage';

function App() {
  const dispatch = useDispatch();
  const { loggedInUser, ready, guestUser } = useSelector(
    (state) => state.userModule
  );

  useEffect(() => {
    const user = getLoggedinUser();
    if (user) {
      console.log(user);
      dispatch(persistLogin(user));
      dispatch(setReady(true));
    } else {
      dispatch(setReady(true));
    }
  }, []);

  const PrivateRoute = (props) => {
    // return props.isAdmin ? <Route {...props} /> : <Redirect to="/" />
    return loggedInUser || guestUser ? (
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
            <Route path="/:landingPage" component={LandingPage} />
            <PrivateRoute path="/" component={MainPage} />
          </Switch>
        </main>
        {(loggedInUser || guestUser) && <AppFooter />}
      </Router>
    );
}

export default App;
