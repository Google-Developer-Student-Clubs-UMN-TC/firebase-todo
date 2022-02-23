import './App.css';
import React from 'react';
import Auth from './auth.js';
import Todo from './todo.js';
import { Container } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDcgMq2DAFqPW_1pqRxI9XFeIBkmq2B7BE",
  authDomain: "fir-todo-341320.firebaseapp.com",
  projectId: "firebase-todo-341320",
  storageBucket: "firebase-todo-341320.appspot.com",
  messagingSenderId: "402410915050",
  appId: "1:402410915050:web:ef6509522584f1064c4393",
  measurementId: "G-HPR082XWZL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
export const analytics = getAnalytics(app);

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render () {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={
              <Container maxWidth="sm">
                <Auth auth={app}/>
              </Container>
            }/>
            <Route path="/home" element={
              <Container maxWidth="sm">
                <Todo todo={app}/>
              </Container>
            }/>
          </Routes>
        </Router>
      </div>
    );
  }
}
