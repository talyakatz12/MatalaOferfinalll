import { createContext, useState, useEffect } from 'react';

export const EmployeesContext = createContext();

export function EmployeesProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favs');
    return saved ? JSON.parse(saved) : [];
  });
  const [monthEmployees, setMonthEmployees] = useState([]);

  // Save employees to localStorage
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees]);

  // Load employees on refresh
  useEffect(() => {
    const saved = localStorage.getItem('employees');
    if (saved) {
      setEmployees(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (emp) => {
    let updatedFavs;
    const exists = favorites.find((f) => f.login.uuid === emp.login.uuid);

    if (exists) {
      updatedFavs = favorites.filter((f) => f.login.uuid !== emp.login.uuid);
    } else {
      updatedFavs = [...favorites, emp];
    }

    setFavorites(updatedFavs);
    localStorage.setItem('favs', JSON.stringify(updatedFavs));
  };

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        setEmployees,
        favorites,
        toggleFavorite,
        monthEmployees,
        setMonthEmployees
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
}
