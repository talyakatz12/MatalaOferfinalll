import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EmployeesProvider } from './context/EmployeesContext';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EmployeesProvider>
      <App />
    </EmployeesProvider>
  </React.StrictMode>
);
