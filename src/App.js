import './App.css';
import React from 'react';
import Auth from './auth.js';
import Todo from './todo.js';
import { Container } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userCredential: undefined };
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}
export default App;