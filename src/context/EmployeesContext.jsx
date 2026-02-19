import { createContext, useState } from 'react';

export const EmployeesContext = createContext();

export function EmployeesProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favs');
    return saved ? JSON.parse(saved) : [];
  });
  const [monthEmployees, setMonthEmployees] = useState([]);

  const toggleFavorite = (emp) => {
    let updatedFavs;

    const exists = favorites.find(
      (f) => f.login.uuid === emp.login.uuid
    );

    if (exists) {
      updatedFavs = favorites.filter(
        (f) => f.login.uuid !== emp.login.uuid
      );
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
