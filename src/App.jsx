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
      const res = await fetch('https://randomuser.me/api/?results=6');
      const data = await res.json();

      const shuffled = [...data.results].sort(() => 0.5 - Math.random());
      setMonthEmployees(shuffled.slice(0, 2));
    };

    loadMonthEmployees();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favs" element={<Favorites />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
