import logo from './logo.svg';
import './App.css';
import React from 'react';
import SiderDemo from "./components/applayout";
import Login from "./components/login";
import Admin from "./components/admin";
import Customer from "./components/customer";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
     return (
        <div>
            <BrowserRouter>
               <Switch>
                  <Route exact path="/">
                     <Login/>
                  </Route>
                  <Route path="/admin">
                     <Admin />
                  </Route>
                  <Route path="/customer">
                     <Customer />
                  </Route>
               </Switch>
            </BrowserRouter>
        </div>
     );
  }
}

export default App;
