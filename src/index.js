import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
  <App />
  </AlertProvider>
);

