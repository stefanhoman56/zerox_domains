import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import './assets/css/index.css';
// import './assets/css/old_project.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/css/index.css';
import './assets/css/home.css';
import './assets/css/aboutus.css';
import './assets/css/responsive.css';

const root = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
