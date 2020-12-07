import React from 'react';
import { Provider } from 'unstated';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import Cookies from 'js-cookie'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Lists from "./pages/Lists/Lists";
import Explore from "./pages/Explore/Explore";
import Friends from "./pages/Friends/Friends";
import FriendProfile from "./pages/FriendProfile/FriendProfile";



import Sidebar from './components/Sidebar/Sidebar';
import Navbaroo from './components/Navbar/Navbar';

import './global.css'

function App() {
  return (
    <Provider>
      <Router>
        <div className="dualPane">
          {
            Cookies.get('username') ? 
            (
            <Sidebar />
            ) :
            ('')
          }
          <Switch>
            <Route exact path="/">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/friends">
              <Friends />
            </Route>
            <Route path="/explore">
              <Explore />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/friendProfile:friendID">
              <FriendProfile />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
