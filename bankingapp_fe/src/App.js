import logo from './logo.svg';
import './App.css';
import React from 'react';
import SiderDemo from "./components/applayout";
import Login from "./components/login";

class App extends React.Component {
  render() {
     return (
        <div>
           <Login/>
        </div>
     );
  }
}

export default App;
