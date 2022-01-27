import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Auth from './Pages/Auth';
import Home from './Pages/Home'


// import Mascot from './components';
import {
  Routes,
  Route,
} from 'react-router-dom'



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: ""
    }
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token && !this.state.sessionToken) {
      this.setState({
        sessionToken: token
      });
    }
  };

  setSessionState = (token) => {
    localStorage.setItem("token", token);
    this.setState({
      sessionToken: token
    });
  };


  render() {
    return (
      <div className="App" >
        <Routes>
          <Route exact path="/" element={<Auth setToken={this.setSessionState} />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </div >
    );
  }
}


