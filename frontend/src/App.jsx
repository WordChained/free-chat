import './style/App.scss';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { MainPage } from './pages/MainPage';
import { AppFooter } from './cmps/AppFooter';
import { AppHeader } from './cmps/AppHeader';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { About } from './pages/About';
import { Rooms } from './pages/Rooms';
import { Room } from './pages/Room';

function App() {
  const { loggedInUser, ready } = useSelector((state) => state.userModule);

  const PrivateRoute = (props) => {
    // return props.isAdmin ? <Route {...props} /> : <Redirect to="/" />
    return loggedInUser ? (
      <Route path={props.path} component={props.component} />
    ) : (
      <Redirect to="/rooms" />
    );
  };
  return (
    <Router>
      <AppHeader />
      <main className="App">
        <Switch>
          {/* <PrivateRoute path="/rooms/:id" component={Room} /> */}
          <Route path="/rooms/:id" component={Room} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/about" component={About} />
          <Route path="/" component={MainPage} />
        </Switch>
      </main>
      <AppFooter />
    </Router>
  );
}

export default App;
