import './style/App.scss';
import {
  HashRouter as Router,
  // Redirect,
  Route,
  Switch,
} from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { MainPage } from './pages/MainPage';
import { AppFooter } from './cmps/AppFooter';
import { AppHeader } from './cmps/AppHeader';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import { About } from './pages/About';
import { Rooms } from './pages/Rooms';

function App() {
  return (
    <Router>
      <AppHeader />
      <main className="App">
        <Switch>
          {/* <PrivateRoute path="/myTattoos" component={MyTattoos} /> */}
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
