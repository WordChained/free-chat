import './style/App.scss';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TattooApp } from './pages/TattooApp';
import { AppHeader } from './cmps/AppHeader';
import { AppFooter } from './cmps/AppFooter';
import { MyTattoos } from './pages/MyTattoos';
import { UserProfile } from './pages/UserProfile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrUser } from './store/actions/userActions';
import { About } from './pages/About';

function App() {
  const { loggedInUser, ready } = useSelector((state) => state.userModule);
  // console.log('loggedInUser: ', loggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrUser());
    //eslint-disable-next-line
  }, []);

  const PrivateRoute = (props) => {
    // return props.isAdmin ? <Route {...props} /> : <Redirect to="/" />
    return loggedInUser ? (
      <Route path={props.path} component={props.component} />
    ) : (
      <Redirect to="/" />
    );
  };
  // const check = () => {
  //   setScroll(window.scrollY);
  //   console.log(scroll);
  // };
  if (!ready) {
    // console.log('ready:', ready);
    return (
      <div className="loader">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else {
    return (
      <Router>
        <AppHeader />
        <main className="App">
          <Switch>
            {loggedInUser && (
              <Route
                path={`/myProfile/${loggedInUser.userName}`}
                component={UserProfile}
              />
            )}
            <PrivateRoute path="/myTattoos" component={MyTattoos} />
            <Route path="/about" component={About} />
            <Route path="/" component={TattooApp} />
          </Switch>
        </main>
        <AppFooter />
      </Router>
    );
  }
}

export default App;
