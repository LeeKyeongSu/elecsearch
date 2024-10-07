import React from 'react';
import ReactDOM from 'react-dom/client'; // react-dom/client로 변경
import App from './App.jsx';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);
