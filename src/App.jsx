// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { EmployeesContext } from './context/EmployeesContext';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import EmployeePage from './pages/EmployeePage';
import Page404 from './pages/Page404';
import Header from './components/Header';

export default function App() {
  const { setMonthEmployees } = useContext(EmployeesContext);

  useEffect(() => {
    const loadMonthEmployees = async () => {
      try {
        const res = await fetch(
          'https://randomuser.me/api/?results=2&seed=month'
        );
        const data = await res.json();
        setMonthEmployees(data.results);
      } catch (err) {
        console.error('Failed to load month employees');
      }
    };

    loadMonthEmployees();
  }, [setMonthEmployees]);

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favs" element={<Favorites />} />
          {/* 👇 כאן התיקון – מוסיפים גם :company */}
// App.jsx
          <Route path="/employee/:company/:uuid" element={<EmployeePage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
